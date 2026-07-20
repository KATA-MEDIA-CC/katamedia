# Attio + Resend enquiry pipeline

Read `HANDOFF.md` first. This replaced Web3Forms as the contact-form backend.

**Status: shipped and verified live on 2026-07-20.** A real submission created
the person, note and assigned 24h task in Attio and delivered both the
auto-reply and the internal notification via Resend (both `delivered` per the
Resend log). The follow-up task is assigned to a founder. See Gotchas for the
two things that bit us during the first live test.

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
   read-write, Object configuration read, **User Management read**
   (the tasks endpoint 403s without it — see Gotchas).
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

## Gotchas (learned in the first live test)

- **Attio tasks need the "User Management" read scope.** Without it, `POST
  /v2/tasks` returns 403 (a task can carry assignees, so it reads members).
  The task write is now best-effort in the route, so a missing scope only
  loses the task, not the whole enquiry — but grant the scope.
- **Workspace slug is `kata-media-consultancy-gmb-h`** (hyphen before the
  final `h`), not `...gmbh`. Taken from Attio's own `web_url`. It's the slug
  in the notification's "Open in Attio" deep-link (`lib/mail.ts`).
- **Task assignee format** (raw API): `assignees: [{ referenced_actor_type:
  "workspace-member", referenced_actor_id: "<member id>" }]`. The assignee id
  lives in `ENQUIRY_ASSIGNEE_MEMBER_ID` in `route.ts` (currently Justin, the
  only member). When more founders join, rotate it.

## Notes / future

- Only Justin is a workspace member today, so every enquiry assigns to him.
  Add the other founders in Attio, then turn `ENQUIRY_ASSIGNEE_MEMBER_ID`
  into a rotation or route by `need`.
- Optional later: a "Website Enquiries" list in Attio (UI: create list on
  People) for pipeline stages; the route can then also add entries to it.
- Company records are deliberately not created in v1 (no reliable unique key
  without a domain) — company name lives in the note. Revisit if needed.
