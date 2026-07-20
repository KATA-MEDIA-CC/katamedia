// ─────────────────────────────────────────────────────────────────────────
// Transactional mail templates, per the CI email spec: plain inline-styled
// HTML, no images, dark-mode safe, one clay bar at the left. The auto-reply
// is bilingual — German first (du-form, matching the site's German voice),
// English below a hairline.
//
// These are template functions, not React email components, on purpose:
// nothing to render, nothing to break, readable in every client.
// ─────────────────────────────────────────────────────────────────────────

import { site } from "@/lib/site";

const INK = "#1A1813";
const CLAY = "#C0532C";
const GREY = "#6B675E";

function shell(inner: string): string {
  return `<!DOCTYPE html>
<html lang="de">
<body style="margin:0;padding:0;background:#ffffff;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;">
    <tr>
      <td style="padding:32px 24px;">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td style="border-left:3px solid ${CLAY};padding-left:16px;">
              <span style="font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:bold;letter-spacing:2px;color:${INK};">KATA</span><br>
              <span style="font-family:Arial,Helvetica,sans-serif;font-size:9px;font-weight:bold;letter-spacing:1.5px;color:${CLAY};text-transform:uppercase;">Knowledge applied to action</span>
            </td>
          </tr>
        </table>
        ${inner}
        <p style="font-family:Arial,Helvetica,sans-serif;font-size:10px;letter-spacing:1px;color:${GREY};margin:36px 0 0;text-transform:uppercase;">
          Kata · <a href="https://${site.domain}" style="color:${CLAY};text-decoration:none;">${site.domain}</a> · <a href="mailto:${site.email}" style="color:${GREY};text-decoration:none;">${site.email}</a>
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

const P = `font-family:Georgia,'Times New Roman',serif;font-size:15px;line-height:1.6;color:${INK};margin:0 0 14px;`;
const MUTED = `font-family:Georgia,'Times New Roman',serif;font-size:13px;line-height:1.6;color:${GREY};margin:0 0 6px;`;
const RULE = `border:none;border-top:1px solid rgba(26,24,19,.15);margin:26px 0;`;

// The confirmation the enquirer receives. It repeats the site's promise
// exactly — 24 hours, an honest read, which founder — because the mail is
// the first proof of whether Kata keeps its word.
export function autoReplyHtml(name: string): string {
  const first = esc(name.split(" ")[0] || name);
  return shell(`
        <p style="${P}margin-top:34px;">Hi ${first},</p>
        <p style="${P}">danke, deine Anfrage ist angekommen.</p>
        <p style="${P}">Innerhalb von 24 Stunden bekommst du eine ehrliche Einsch&auml;tzung, ob wir die Richtigen daf&uuml;r sind, und mit welchem Gr&uuml;nder du arbeiten w&uuml;rdest. Es antwortet ein Mensch, keine Standardmail.</p>
        <p style="${P}">Bis gleich,<br>Justin, Cornelius &amp; Jankel</p>
        <hr style="${RULE}">
        <p style="${MUTED}"><em>English:</em> Thank you. Your enquiry has arrived. Within 24 hours you&rsquo;ll get an honest read on whether we&rsquo;re the right people to help, and which founder you&rsquo;d be working with. A person will reply, not a template.</p>`);
}

// The internal notification to hello@ — same fields the Web3Forms mail
// carried, plus a link to the Attio record. reply_to is the enquirer, so
// answering from the inbox still just works.
export function notificationHtml(
  e: {
    name: string;
    email: string;
    company: string;
    role: string;
    side: string;
    need: string;
    timing: string;
    message: string;
  },
  recordId?: string
): string {
  const row = (label: string, value: string) =>
    `<tr><td style="font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;color:${GREY};padding:6px 16px 6px 0;white-space:nowrap;vertical-align:top;">${label}</td><td style="${P.replace("margin:0 0 14px;", "margin:0;")}padding:4px 0;">${esc(value || "—")}</td></tr>`;
  const attio = recordId
    ? `<p style="${MUTED}margin-top:18px;"><a href="https://app.attio.com/kata-media-consultancy-gmb-h/person/${recordId}" style="color:${CLAY};text-decoration:none;font-weight:bold;">&rarr; Open in Attio</a> &nbsp;(note + 24h task attached)</p>`
    : "";
  return shell(`
        <p style="${P}margin-top:34px;font-weight:bold;">New website enquiry</p>
        <table role="presentation" cellpadding="0" cellspacing="0">
          ${row("Name", e.name)}
          ${row("Email", e.email)}
          ${row("Company", e.company)}
          ${row("Role", e.role)}
          ${row("They are a", e.side)}
          ${row("They need", e.need)}
          ${row("Timing", e.timing)}
        </table>
        <hr style="${RULE}">
        <p style="${MUTED}">Trying to figure out:</p>
        <p style="${P}">${esc(e.message).replace(/\n/g, "<br>")}</p>
        ${attio}`);
}
