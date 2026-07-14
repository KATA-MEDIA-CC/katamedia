// ─────────────────────────────────────────────────────────────────────────
// Contact form delivery.
//
// ⚠️  THE FORM IS NOT CONNECTED YET. This is the ONLY file to change to make
//     it live — the UI already handles sending, success and failure states.
//
// To wire it up, pick one:
//
//   A) Resend (proper email from katamedia.cc — recommended)
//      1. npm install resend
//      2. Create a Resend account, verify katamedia.cc, grab an API key.
//      3. Add RESEND_API_KEY in Vercel → Settings → Environment Variables.
//      4. Make this a server action and send:
//
//         "use server";
//         import { Resend } from "resend";
//         export async function submitEnquiry(data: Enquiry) {
//           const resend = new Resend(process.env.RESEND_API_KEY);
//           const { error } = await resend.emails.send({
//             from: "site@katamedia.cc",
//             to: "justin@katamedia.cc",
//             replyTo: data.email,
//             subject: `Enquiry — ${data.name}`,
//             text: `${data.name} <${data.email}>\n${data.company}\n\n${data.message}`,
//           });
//           if (error) throw new Error(error.message);
//         }
//
//   B) Web3Forms / Formspree (fastest — one key, no DNS)
//      export async function submitEnquiry(data: Enquiry) {
//        const r = await fetch("https://api.web3forms.com/submit", {
//          method: "POST",
//          headers: { "Content-Type": "application/json" },
//          body: JSON.stringify({ access_key: "YOUR_KEY", ...data }),
//        });
//        if (!r.ok) throw new Error("Send failed");
//      }
//
// Until then this throws NotConfiguredError on purpose: the form must never
// pretend an enquiry was sent, or real leads vanish silently.
// ─────────────────────────────────────────────────────────────────────────

export type Enquiry = {
  name: string;
  email: string;
  company: string;
  message: string;
};

export class NotConfiguredError extends Error {
  constructor() {
    super("The enquiry form has no delivery provider wired up yet.");
    this.name = "NotConfiguredError";
  }
}

export async function submitEnquiry(data: Enquiry): Promise<void> {
  void data; // referenced so the signature stays honest until a provider lands
  throw new NotConfiguredError();
}
