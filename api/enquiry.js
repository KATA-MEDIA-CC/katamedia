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
// Change from the original: mail templates moved from CI V2.0 clay to V3.0,
// then to the lockup artwork, the site fonts and a plate (Sept 2026).
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

// ── mail templates: Kata CI V3.0, as far as email allows ─────────────────
// The lockup is artwork, never type: a black PNG, with a white one that dark
// clients swap in. Newsreader and Hanken Grotesk load from our own origin
// (/fonts carries CORS for this); Georgia and Helvetica stand in where a client
// will not load fonts. Ink, Graphite, and Glacier Deep as the one accent. No
// rules, like the site. The confirmation carries one plate of light in an oval
// that feathers out to nothing: plate-crossing on paper, deep-beam in dark mode.
// Tables and inline styles throughout: the <style> block only adds the fonts
// and dark mode, and everything still reads without it.
// Artwork: src/static/mail-*.png, made by src/mail_assets.py.
const C = { ink: "#0B0B0F", graphite: "#6B6F76", accent: "#2E5A7D", glacier: "#D9E7F5", paper: "#FFFFFF" };
const SERIF = "'Newsreader',Georgia,'Times New Roman',serif";
const SANS = "'Hanken Grotesk','Helvetica Neue',Helvetica,Arial,sans-serif";
const ORIGIN = `https://${SITE.domain}`;
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const KICKER = `margin:0;font-family:${SANS};font-size:11px;font-weight:500;letter-spacing:.24em;text-transform:uppercase;color:${C.ink};`;
const LABEL = `font-family:${SANS};font-size:10px;font-weight:500;letter-spacing:.18em;text-transform:uppercase;color:${C.graphite};`;
const BODY = `font-family:${SANS};font-size:15px;line-height:1.6;color:${C.ink};`;

function shell({ lang, preheader, light, inner }) {
  const pad = "&#8199;&#65279;&#847;".repeat(60); // keeps the client's preview to the preheader
  return `<!DOCTYPE html>
<html lang="${lang}" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<meta name="color-scheme" content="light dark">
<meta name="supported-color-schemes" content="light dark">
<title>Kata</title>
<style>
@font-face{font-family:'Newsreader';font-style:normal;font-weight:200 400;src:url(${ORIGIN}/fonts/cY9AfjOCX1hbuyalUrK4397yjA.woff2) format('woff2')}
@font-face{font-family:'Hanken Grotesk';font-style:normal;font-weight:200 500;src:url(${ORIGIN}/fonts/ieVn2YZDLWuGJpnzaiwFXS9tYtpd59A.woff2) format('woff2')}
body{margin:0;padding:0;-webkit-text-size-adjust:100%}
a{text-decoration:none}
.k-dark{display:none;max-height:0;overflow:hidden}
@media (prefers-color-scheme:dark){
  body,.k-bg{background:${C.ink}!important}
  .k-light{display:none!important}
  .k-dark{display:block!important;max-height:none!important;overflow:visible!important}
  .k-ink{color:${C.paper}!important}
  .k-gr{color:#A3A8AF!important}
  .k-ac{color:${C.glacier}!important}
}
[data-ogsc] .k-light{display:none!important}
[data-ogsc] .k-dark{display:block!important;max-height:none!important}
[data-ogsc] .k-ink{color:${C.paper}!important}
[data-ogsc] .k-gr{color:#A3A8AF!important}
[data-ogsc] .k-ac{color:${C.glacier}!important}
</style>
</head>
<body class="k-bg" style="margin:0;padding:0;background:${C.paper};">
<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;font-size:1px;line-height:1px;opacity:0;color:${C.paper};">${esc(preheader)}${pad}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="k-bg" style="background:${C.paper};">
<tr><td align="center" style="padding:0 20px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;">
<tr><td style="padding:48px 0 0;">
<img class="k-light" src="${ORIGIN}/mail-lockup.png" width="112" alt="Kata" style="display:block;width:112px;height:auto;border:0;outline:none;">
<!--[if !mso]><!--><img class="k-dark" src="${ORIGIN}/mail-lockup-white.png" width="112" alt="Kata" style="display:none;width:112px;height:auto;border:0;outline:none;max-height:0;overflow:hidden;"><!--<![endif]-->
</td></tr>
${light ? `<tr><td style="padding:22px 0 0;">
<img class="k-light" src="${ORIGIN}/mail-light.png" width="560" alt="" style="display:block;width:100%;max-width:560px;height:auto;border:0;outline:none;">
<!--[if !mso]><!--><img class="k-dark" src="${ORIGIN}/mail-light-dark.png" width="560" alt="" style="display:none;width:100%;max-width:560px;height:auto;border:0;outline:none;max-height:0;overflow:hidden;"><!--<![endif]-->
</td></tr>` : ""}
${inner}
<tr><td style="padding:64px 0 48px;">
<p class="k-gr" style="margin:0;${LABEL}">Kata &middot; Independent Production Architects</p>
<p class="k-gr" style="margin:10px 0 0;font-family:${SANS};font-size:12px;line-height:1.7;color:${C.graphite};"><a class="k-ac" href="${ORIGIN}" style="color:${C.accent};text-decoration:none;">${SITE.domain}</a>&nbsp;&nbsp;&middot;&nbsp;&nbsp;<a class="k-gr" href="mailto:${SITE.email}" style="color:${C.graphite};text-decoration:none;">${SITE.email}</a><br><a class="k-gr" href="${ORIGIN}/imprint" style="color:${C.graphite};text-decoration:none;">Impressum</a>&nbsp;&nbsp;&middot;&nbsp;&nbsp;<a class="k-gr" href="${ORIGIN}/privacy" style="color:${C.graphite};text-decoration:none;">Datenschutz</a></p>
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}

// First name only, however it was typed: "Dr. Anna Weber", "Weber, Anna",
// "anna weber", "ANNA WEBER". The same rule as the thank-you on the site
// (enqFirst in kata.html). Anything that does not look like a name, such as a
// link or a string of digits, gets no name at all: the form can be typed into
// by anyone, and this mail goes to whatever address they give.
function firstName(n) {
  n = String(n).replace(/\s+/g, " ").trim();
  if (n.indexOf(",") > 0 && n.split(",")[1].trim()) n = n.split(",")[1].trim();
  const w = n.split(" ").filter((t) => !/^(dr|prof|professor|herr|frau|mr|mrs|ms|mx|miss|sir|dipl|ing)\.?(-ing\.?)?$/i.test(t));
  let f = (w[0] || n).replace(/[.,;:]+$/, "");
  if (f.length > 2 && f === f.toUpperCase()) f = f.toLowerCase();
  if (f === f.toLowerCase()) f = f.charAt(0).toUpperCase() + f.slice(1);
  return /^[\p{L}][\p{L}'’\-]{0,39}$/u.test(f) ? f : "";
}

function autoReplyHtml(name) {
  const first = firstName(name);
  const de = first ? `Danke, ${esc(first)}.` : "Danke.";
  const en = first ? `Thank you, ${esc(first)}.` : "Thank you.";
  const inner = `
<tr><td lang="de" style="padding:14px 0 0;">
<p class="k-ink" style="${KICKER}">Angekommen</p>
<h1 class="k-ink" style="margin:18px 0 0;font-family:${SERIF};font-size:40px;font-weight:300;line-height:1.05;letter-spacing:-0.02em;color:${C.ink};">${de}</h1>
<p class="k-ink" style="margin:18px 0 0;font-family:${SANS};font-size:18px;font-weight:300;line-height:1.5;color:${C.ink};">Einer von uns meldet sich innerhalb von 24&nbsp;Stunden bei dir.</p>
</td></tr>
<tr><td lang="en" style="padding:44px 0 0;">
<p class="k-gr" style="${KICKER}color:${C.graphite};">Received</p>
<p class="k-ink" style="margin:14px 0 0;font-family:${SERIF};font-size:26px;font-weight:300;line-height:1.15;letter-spacing:-0.015em;color:${C.ink};">${en}</p>
<p class="k-gr" style="margin:12px 0 0;font-family:${SANS};font-size:15px;line-height:1.6;color:${C.graphite};">One of us will come back to you within 24&nbsp;hours.</p>
</td></tr>
<tr><td style="padding:44px 0 0;">
<p class="k-ac" style="margin:0;font-family:${SANS};font-size:11px;font-weight:500;letter-spacing:.18em;text-transform:uppercase;color:${C.accent};">Justin, Cornelius &amp; Jankel</p>
</td></tr>`;
  return shell({ lang: "de", light: true, inner,
    preheader: "Einer von uns meldet sich innerhalb von 24 Stunden bei dir. One of us will come back to you within 24 hours." });
}
function autoReplyText(name) {
  const first = firstName(name);
  return [first ? `Danke, ${first}.` : "Danke.", "Einer von uns meldet sich innerhalb von 24 Stunden bei dir.", "",
    first ? `Thank you, ${first}.` : "Thank you.", "One of us will come back to you within 24 hours.", "",
    "Justin, Cornelius & Jankel", "", `Kata · ${SITE.domain} · ${SITE.email}`].join("\n");
}

function notificationHtml(e, recordId) {
  const row = (label, value) =>
    `<tr><td class="k-gr" style="${LABEL}padding:9px 20px 9px 0;white-space:nowrap;vertical-align:top;">${label}</td><td class="k-ink" style="${BODY}padding:6px 0;vertical-align:top;">${esc(value || "-")}</td></tr>`;
  const who = esc(e.name) + (e.company ? `, ${esc(e.company)}` : "");
  const inner = `
<tr><td style="padding:40px 0 0;">
<p class="k-ink" style="${KICKER}">New enquiry</p>
<h1 class="k-ink" style="margin:16px 0 0;font-family:${SERIF};font-size:32px;font-weight:300;line-height:1.1;letter-spacing:-0.02em;color:${C.ink};">${who}</h1>
</td></tr>
<tr><td style="padding:26px 0 0;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0">
${row("Email", e.email)}${row("Role", e.role)}${row("They are a", e.side)}${row("They need", e.need)}${row("Timing", e.timing)}
</table>
</td></tr>
<tr><td style="padding:30px 0 0;">
<p class="k-gr" style="margin:0;${LABEL}">Trying to figure out</p>
<p class="k-ink" style="margin:10px 0 0;font-family:${SERIF};font-size:20px;font-weight:300;line-height:1.45;color:${C.ink};">${esc(e.message).replace(/\n/g, "<br>")}</p>
</td></tr>
${recordId ? `<tr><td style="padding:30px 0 0;">
<a class="k-ac" href="https://app.attio.com/kata-media-consultancy-gmb-h/person/${recordId}" style="font-family:${SANS};font-size:11px;font-weight:500;letter-spacing:.18em;text-transform:uppercase;color:${C.accent};text-decoration:none;">Open in Attio &rarr;</a>
<p class="k-gr" style="margin:8px 0 0;font-family:${SANS};font-size:12px;color:${C.graphite};">Note and a 24-hour task are attached. Reply to this mail to answer them directly.</p>
</td></tr>` : ""}`;
  return shell({ lang: "en", light: false, inner, preheader: `${e.name}${e.company ? `, ${e.company}` : ""}: ${String(e.message).slice(0, 90)}` });
}
function notificationText(e, recordId) {
  return [`New enquiry: ${e.name}${e.company ? `, ${e.company}` : ""}`, "",
    `Email: ${e.email}`, `Role: ${e.role || "-"}`, `They are a: ${e.side || "-"}`, `They need: ${e.need || "-"}`, `Timing: ${e.timing || "-"}`, "",
    "Trying to figure out:", e.message, "",
    recordId ? `Open in Attio: https://app.attio.com/kata-media-consultancy-gmb-h/person/${recordId}` : ""].join("\n");
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
    await resend({ from: FROM, to: [email], reply_to: SITE.email, subject: "Angekommen · Received", html: autoReplyHtml(name), text: autoReplyText(name) });
  } catch (err) { console.error("enquiry: auto-reply failed:", err); }
  try {
    await resend({ from: FROM, to: [SITE.email], reply_to: email,
      subject: `Enquiry: ${name}${company ? `, ${company}` : ""}`, html: notificationHtml(enquiry, recordId), text: notificationText(enquiry, recordId) });
  } catch (err) { console.error("enquiry: notification failed:", err); }

  return res.status(200).json({ ok: true });
};
