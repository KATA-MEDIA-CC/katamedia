// ─────────────────────────────────────────────────────────────────────────
// Contact form delivery — Web3Forms.
//
// This is the ONLY file that talks to the provider. The UI handles sending,
// success and failure; swapping provider means rewriting submitEnquiry() and
// nothing else.
//
// Setup:
//   1. Get a free access key at https://web3forms.com — it's tied to the
//      address enquiries are delivered to, so register it to the shared
//      founders alias, hello@katamedia.cc (site.email).
//   2. Vercel → Settings → Environment Variables →
//      NEXT_PUBLIC_WEB3FORMS_KEY = <key>, for all environments.
//   3. Redeploy. The key is inlined at BUILD time (this site is fully
//      static), so setting the var alone does nothing until a rebuild.
//   4. Locally: put the same line in .env.local (see .env.example).
//
// The key is public by design — Web3Forms keys are meant to be embedded in
// client-side code, and NEXT_PUBLIC_ ships it in the bundle. It's kept in an
// env var so it stays out of this public repo and can be rotated without a
// commit, not because it's a secret. Abuse is bounded by the honeypot and by
// Web3Forms' own rate limiting; the key only ever sends mail to its owner.
//
// If the key is missing this throws NotConfiguredError rather than pretending
// to send. A form that silently swallows enquiries is worse than one that
// admits it's broken.
// ─────────────────────────────────────────────────────────────────────────

export type Enquiry = {
  name: string;
  email: string;
  company: string;
  role: string;
  side: string; // Brand | Agency | Other
  need: string; // which pillar, or "Not sure yet"
  timing: string;
  message: string;
};

// Qualification options — keep these in step with the four pillars.
export const SIDES = ["Brand", "Agency", "Other"] as const;

export const NEEDS = [
  "Not sure yet",
  "Production controlling",
  "Strategic advisory",
  "Organisational setup & studio builds",
  "AI integration",
] as const;

export const TIMINGS = [
  "Not sure yet",
  "Now — it's live",
  "Next 3 months",
  "Later in 2026",
  "Just exploring",
] as const;

export class NotConfiguredError extends Error {
  constructor() {
    super("The enquiry form has no delivery provider wired up yet.");
    this.name = "NotConfiguredError";
  }
}

// ⚠️ This fetch MUST run in the browser. Web3Forms rejects server-side calls
// on the free plan — a request from a server IP gets 403 "This method is not
// allowed. Use our API in client side". So do NOT turn submitEnquiry into a
// server action or route handler without moving to a provider that allows it
// (Resend, which is the better long-term answer anyway). ContactForm is a
// client component, which is what keeps this legal.
const ENDPOINT = "https://api.web3forms.com/submit";
const KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

export function isConfigured(): boolean {
  return Boolean(KEY);
}

export async function submitEnquiry(data: Enquiry): Promise<void> {
  if (!KEY) throw new NotConfiguredError();

  let res: Response;
  try {
    res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      // A hung request would leave the button on "Sending…" forever.
      signal: AbortSignal.timeout(20_000),
      body: JSON.stringify({
        access_key: KEY,
        subject: `Enquiry — ${data.name}, ${data.company}`,
        from_name: "katamedia.cc",
        // so replying in the mail client goes straight back to them
        replyto: data.email,
        // Web3Forms mails the payload as-is, so these keys are the field
        // labels that land in the inbox. Order is the order you read them in.
        Name: data.name,
        Email: data.email,
        Company: data.company,
        Role: data.role || "—",
        "They are a": data.side,
        "What they need": data.need,
        Timing: data.timing,
        "Trying to figure out": data.message,
      }),
    });
  } catch {
    // network failure, DNS, timeout, offline
    throw new Error("Could not reach the enquiry service.");
  }

  // Web3Forms answers 200 with {success:false} for a bad or throttled key, so
  // res.ok alone is not enough to call this delivered.
  let body: { success?: boolean; message?: string } = {};
  try {
    body = await res.json();
  } catch {
    /* non-JSON body — fall through to the status check */
  }
  if (!res.ok || body.success !== true) {
    throw new Error(body.message || `Enquiry service returned ${res.status}.`);
  }
}
