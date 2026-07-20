// ─────────────────────────────────────────────────────────────────────────
// Contact form delivery — own API route (/api/enquiry).
//
// This is the ONLY file the UI talks to. It used to POST straight to
// Web3Forms from the browser; that could only forward an email — no CRM
// record, no auto-reply. Now the browser posts to our own route on Vercel,
// and the server does the real work:
//
//   Attio    person upserted by email · enquiry attached as a note ·
//            follow-up task with a 24h deadline (the promise on the site,
//            enforced by the CRM)
//   Resend   bilingual auto-reply to the enquirer from hello@katamedia.cc ·
//            internal notification to hello@ (reply-to = the enquirer)
//
// Keys live server-side only (ATTIO_API_KEY, RESEND_API_KEY — no
// NEXT_PUBLIC prefix, nothing ships in the bundle). See
// app/api/enquiry/route.ts for scopes and setup, .env.example for the vars.
//
// If the server reports itself unconfigured (503), submitEnquiry throws
// NotConfiguredError and the form shows the "email us directly" state — a
// form that silently swallows enquiries is worse than one that admits it's
// broken.
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
  "Strategic advisory",
  "Organisational setup & studio builds",
  "AI integration",
  "Production controlling",
] as const;

export const TIMINGS = [
  "Not sure yet",
  "Now, it's live",
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

export async function submitEnquiry(data: Enquiry): Promise<void> {
  let res: Response;
  try {
    res = await fetch("/api/enquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // A hung request would leave the button on "Sending…" forever.
      signal: AbortSignal.timeout(25_000),
      body: JSON.stringify(data),
    });
  } catch {
    // network failure, DNS, timeout, offline
    throw new Error("Could not reach the enquiry service.");
  }

  if (res.status === 503) throw new NotConfiguredError();
  let body: { ok?: boolean; error?: string } = {};
  try {
    body = await res.json();
  } catch {
    /* non-JSON body — fall through to the status check */
  }
  if (!res.ok || body.ok !== true) {
    throw new Error(body.error || `Enquiry service returned ${res.status}.`);
  }
}
