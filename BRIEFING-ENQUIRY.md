# Briefing — ship the Attio + Resend enquiry pipeline

Read `HANDOFF.md` first. This replaces Web3Forms as the contact-form backend.
**The code is already written and on disk, uncommitted** — verify and ship.

New/changed files: `app/api/enquiry/route.ts` (new) · `lib/mail.ts` (new) ·
`lib/enquiry.ts` (rewritten client) · `.env.example` (new vars) · this file.

## What it does

Form → POST `/api/enquiry` (Vercel route, server-side) →

1. **Attio** (system of record — hard failure if this write fails):
   person upserted by email → enquiry attached as note → follow-up task with
   **24h deadline** (the site's promise, enforced in the CRM).
2. **Resend**: bilingual auto-reply (DE du-form first, EN below, CI email
   style — no images, one clay bar) from `hello@katamedia.cc`.
3. **Resend**: internal notification to `hello@`, reply-to = enquirer, with a
   direct link to the Attio record.

Mail failures are logged but don't fail the request — the record exists.
The site is no longer fully static (one dynamic route); everything else
stays prerendered.

## Justin's manual steps (before or right after deploy)

1. **Attio API key**: app.attio.com → Workspace settings → Developers →
   API keys → create. Scopes: Record read-write, Note read-write, Task
   read-write, Object configuration read.
2. **Resend**: create account (free tier is plenty) → Domains → add
   `katamedia.cc` → set the DNS records Resend shows (at the DNS host for
   katamedia.cc) → wait for "verified" → API Keys → create.
3. **Vercel** → Project katamedia → Settings → Environment Variables:
   `ATTIO_API_KEY`, `RESEND_API_KEY` (all environments, server-side).
4. After the route is live: **remove** `NEXT_PUBLIC_WEB3FORMS_KEY` from
   Vercel — nothing reads it anymore.

Until the keys are set, the form shows the honest "email us directly"
fallback (route returns 503) — same behaviour as the old unconfigured state.

## Ship checklist

1. `git status` / diff — only the files listed above.
2. `npm run build` && `npm run lint` (verified green once already;
   `/api/enquiry` shows as ƒ Dynamic, all pages stay ○ Static).
3. Local smoke test without keys: POST to `/api/enquiry` → expect 503;
   missing fields → 400; honeypot field `website` filled → `{"ok":true}`.
4. Commit + push to `main` (auto-deploy).
5. With keys set: submit the live form once with a real address you control.
   Verify: person + note + task appear in Attio · auto-reply arrives ·
   notification arrives at hello@ with working reply-to.

## Notes / future

- The notification's Attio deep-link assumes workspace slug
  `kata-media-consultancy-gmbh` — if the link 404s, correct the slug in
  `lib/mail.ts` (one string).
- Optional later: a "Website Enquiries" list in Attio (UI: create list on
  People) for pipeline stages; the route can then also add entries to it.
- Company records are deliberately not created in v1 (no reliable unique key
  without a domain) — company name lives in the note. Revisit if needed.
