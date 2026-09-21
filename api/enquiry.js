// ─────────────────────────────────────────────────────────────────────────
// POST /api/enquiry — the enquiry form's server-side delivery.
//
// Ported 1:1 from app/api/enquiry/route.ts in the Next.js site (katamedia),
// as a dependency-free Vercel Function so it runs beside the static site.
// Same order of importance, same failure rules:
//
//   1. ATTIO  — upsert the person by email, attach the enquiry as a note,
//               and (best-effort) a follow-up task due in 24 hours.
//   2. RESEND — bilingual auto-reply to the enquirer.
//   3. RESEND — internal notification to hello@, reply-to the enquirer.
//
// Attio is the system of record: if the person/note write fails, the request
// FAILS and the visitor is told to email instead — never an enquiry that
// exists only as an email. If only the mails fail, it still returns ok.
//
// Env (server-side only; already set in the Vercel project):
//   ATTIO_API_KEY, RESEND_API_KEY
// Change from the original: mail templates moved from CI V2.0 clay to V3.0.
// ─────────────────────────────────────────────────────────────────────────

const ATTIO = "https://api.attio.com/v2";
const SITE = {
  domain: "bureau-kata.com",
  email: "hello@bureau-kata.com",
  // Resend "from" must be a verified domain; bureau-kata.com is not verified
  // in Resend yet, so mail still SENDS from katamedia.cc while everything the
  // visitor sees (reply-to, displayed address, notification target) is
  // bureau-kata.com. Once bureau-kata.com is verified, set this to SITE.email.
  mailFrom: "hello@katamedia.cc",
};
// Every enquiry's follow-up task lands in a founder's "My tasks".
const ENQUIRY_ASSIGNEE_MEMBER_ID = "284cb5f7-36c9-41ac-ae7b-71a83cb1212c"; // Justin Stiebel

async function attio(path, method, body) {
  const res = await fetch(`${ATTIO}${path}`, {
    method,
    headers: { Authorization: `Bearer ${process.env.ATTIO_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(15000),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Attio ${path} → ${res.status}: ${text.slice(0, 300)}`);
  }
  return res.json();
}

async function resend(payload) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(15000),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Resend → ${res.status}: ${text.slice(0, 300)}`);
  }
}

// ── mail templates: plain inline HTML, no images, dark-mode safe, one bar ──
const INK = "#0B0B0F", ACCENT = "#2E5A7D", GREY = "#6B6F76";
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const P = `font-family:Georgia,'Times New Roman',serif;font-size:15px;line-height:1.6;color:${INK};margin:0 0 14px;`;
const MUTED = `font-family:Georgia,'Times New Roman',serif;font-size:13px;line-height:1.6;color:${GREY};margin:0 0 6px;`;
const RULE = `border:none;border-top:1px solid rgba(11,11,15,.15);margin:26px 0;`;
function shell(inner) {
  return `<!DOCTYPE html>
<html lang="de">
<body style="margin:0;padding:0;background:#ffffff;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;">
    <tr><td style="padding:32px 24px;">
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%"><tr>
        <td style="border-left:3px solid ${ACCENT};padding-left:16px;">
          <span style="font-family:Arial,Helvetica,sans-serif;font-size:18px;letter-spacing:.5px;color:${INK};">kata</span><br>
          <span style="font-family:Arial,Helvetica,sans-serif;font-size:9px;letter-spacing:1.5px;color:${INK};text-transform:uppercase;">Knowledge applied to action</span>
        </td></tr></table>
      ${inner}
      <p style="font-family:Arial,Helvetica,sans-serif;font-size:10px;letter-spacing:1px;color:${GREY};margin:36px 0 0;text-transform:uppercase;">
        Kata · <a href="https://${SITE.domain}" style="color:${ACCENT};text-decoration:none;">${SITE.domain}</a> · <a href="mailto:${SITE.email}" style="color:${GREY};text-decoration:none;">${SITE.email}</a>
      </p>
    </td></tr>
  </table>
</body>
</html>`;
}
// First name only, however it was typed: "Dr. Anna Weber", "Weber, Anna", "anna weber".
// The same rule as the thank-you on the site (enqFirst in kata.html).
function firstName(n) {
  n = String(n).replace(/\s+/g, " ").trim();
  if (n.indexOf(",") > 0 && n.split(",")[1].trim()) n = n.split(",")[1].trim();
  const w = n.split(" ").filter((t) => !/^(dr|prof|professor|herr|frau|mr|mrs|ms|mx|miss|sir|dipl|ing)\.?(-ing\.?)?$/i.test(t));
  const f = (w[0] || n).replace(/[.,;:]+$/, "");
  return f === f.toLowerCase() ? f.charAt(0).toUpperCase() + f.slice(1) : f;
}
function autoReplyHtml(name) {
  const first = esc(firstName(name));
  return shell(`
      <p style="${P}margin-top:34px;">Hi ${first},</p>
      <p style="${P}">danke f&uuml;r deine Nachricht &ndash; ist angekommen.</p>
      <p style="${P}">Du h&ouml;rst innerhalb von 24 Stunden von uns.</p>
      <p style="${P}">Bis bald,<br>Justin, Cornelius &amp; Jankel</p>
      <hr style="${RULE}">
      <p style="${MUTED}"><em>English:</em> Thanks for your message &ndash; it&rsquo;s arrived. You&rsquo;ll hear from us within 24 hours.</p>`);
}
function notificationHtml(e, recordId) {
  const row = (label, value) =>
    `<tr><td style="font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;color:${GREY};padding:6px 16px 6px 0;white-space:nowrap;vertical-align:top;">${label}</td><td style="${P.replace("margin:0 0 14px;", "margin:0;")}padding:4px 0;">${esc(value || "—")}</td></tr>`;
  const link = recordId
    ? `<p style="${MUTED}margin-top:18px;"><a href="https://app.attio.com/kata-media-consultancy-gmb-h/person/${recordId}" style="color:${ACCENT};text-decoration:none;font-weight:bold;">&rarr; Open in Attio</a> &nbsp;(note + 24h task attached)</p>`
    : "";
  return shell(`
      <p style="${P}margin-top:34px;font-weight:bold;">New website enquiry</p>
      <table role="presentation" cellpadding="0" cellspacing="0">
        ${row("Name", e.name)}${row("Email", e.email)}${row("Company", e.company)}${row("Role", e.role)}
        ${row("They are a", e.side)}${row("They need", e.need)}${row("Timing", e.timing)}
      </table>
      <hr style="${RULE}">
      <p style="${MUTED}">Trying to figure out:</p>
      <p style="${P}">${esc(e.message).replace(/\n/g, "<br>")}</p>
      ${link}`);
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") { res.setHeader("Allow", "POST"); return res.status(405).json({ error: "method not allowed" }); }
  let data = req.body;
  if (typeof data === "string") { try { data = JSON.parse(data); } catch { return res.status(400).json({ error: "bad request" }); } }
  if (!data || typeof data !== "object") return res.status(400).json({ error: "bad request" });

  // Honeypot: pretend success, deliver nothing.
  if (data.website) return res.status(200).json({ ok: true });

  const name = String(data.name || "").trim();
  const email = String(data.email || "").trim();
  const message = String(data.message || "").trim();
  if (!name || !email || !message || !email.includes("@")) return res.status(400).json({ error: "missing fields" });

  // 503 = the form's honest "unwired" state: the visitor is told to email.
  if (!process.env.ATTIO_API_KEY || !process.env.RESEND_API_KEY) return res.status(503).json({ error: "unconfigured" });

  const company = String(data.company || "").trim();
  const enquiry = {
    name, email, company, message,
    role: String(data.role || "").trim(),
    side: String(data.side || ""), need: String(data.need || ""), timing: String(data.timing || ""),
  };

  // ── 1. Attio: the system of record ─────────────────────────────────────
  let recordId;
  try {
    const person = await attio("/objects/people/records?matching_attribute=email_addresses", "PUT", {
      data: { values: {
        email_addresses: [{ email_address: email }],
        name: [{ first_name: name.split(/\s+/)[0] || name, last_name: name.split(/\s+/).slice(1).join(" "), full_name: name }],
      } },
    });
    recordId = person && person.data && person.data.id && person.data.id.record_id;
    if (recordId) {
      await attio("/notes", "POST", { data: {
        parent_object: "people", parent_record_id: recordId,
        title: `Website enquiry — ${company || name}`, format: "plaintext",
        content: [
          `Company: ${company || "—"}`, `Role: ${enquiry.role || "—"}`, `They are a: ${enquiry.side || "—"}`,
          `What they need: ${enquiry.need || "—"}`, `Timing: ${enquiry.timing || "—"}`, "", "Trying to figure out:", message,
        ].join("\n"),
      } });
    }
  } catch (err) {
    console.error("enquiry: Attio person/note write failed:", err);
    return res.status(502).json({ error: "delivery failed" });
  }

  // The 24-hour follow-up task. Best-effort: never lose a captured enquiry over it.
  if (recordId) {
    try {
      await attio("/tasks", "POST", { data: {
        content: `Reply to website enquiry: ${name}${company ? `, ${company}` : ""} (24h promise)`,
        format: "plaintext",
        deadline_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        is_completed: false,
        linked_records: [{ target_object: "people", target_record_id: recordId }],
        assignees: [{ referenced_actor_type: "workspace-member", referenced_actor_id: ENQUIRY_ASSIGNEE_MEMBER_ID }],
      } });
    } catch (err) {
      console.error("enquiry: Attio task creation failed (enquiry still captured):", err);
    }
  }

  // ── 2 + 3. Mail — best-effort; the record already exists ───────────────
  const FROM = `Kata <${SITE.mailFrom}>`;
  try {
    await resend({ from: FROM, to: [email], reply_to: SITE.email, subject: "Angekommen · Received — Kata", html: autoReplyHtml(name) });
  } catch (err) { console.error("enquiry: auto-reply failed:", err); }
  try {
    await resend({ from: FROM, to: [SITE.email], reply_to: email,
      subject: `Enquiry: ${name}${company ? `, ${company}` : ""}`, html: notificationHtml(enquiry, recordId) });
  } catch (err) { console.error("enquiry: notification failed:", err); }

  return res.status(200).json({ ok: true });
};
