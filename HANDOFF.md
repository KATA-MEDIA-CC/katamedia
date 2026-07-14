# Kata — project handoff

Working notes for picking this up in a fresh session. The site is **live**.

| | |
| --- | --- |
| **Live** | https://katamedia.cc (apex canonical; `www` → 308 → apex) |
| **Repo** | https://github.com/KATA-MEDIA-CC/katamedia — public, org-owned |
| **Local** | `~/katamedia` — `main` tracks `origin/main` |
| **Host** | Vercel (project `katamedia`, personal Hobby team). Push to `main` = auto-deploy |
| **Fallback URL** | katamedia.vercel.app |

## The business

**Kata** — independent production advisory for brands and agencies (German-speaking market).
Pre-launch, three founding partners. Built from a CI system + a partner pitch deck.

- **Tagline:** "Knowledge applied to action"
- **Belief:** "We sit beside the decision — never above the process, never inside the margin."
- **Founders:** Justin Stiebel, Cornelius Roenz, Jankel Huppertz (`justin@` / `cornelius@` / `jankel@katamedia.cc`)

## Stack

Next.js 16 (App Router) · React 19 · Tailwind v4 · GSAP · TypeScript. Fully static.

```bash
npm run dev     # localhost:3000
npm run build
npm run lint
```

- **Node** lives at `~/.local/nodejs/node-v22.23.1-darwin-arm64/bin` (no Homebrew on this Mac). On PATH via `~/.zshrc`.
- **gh CLI** at `~/.local/ghcli/gh_2.96.0_macOS_arm64/bin`, authed as `justinstiebel`.

## Design system (the CI — stick to it)

Ported 1:1 from the client's standalone CI file into `app/globals.css`.

| Token | Value |
| --- | --- |
| paper | `#F6F2E8` |
| ink | `#1A1813` |
| clay | `#C0532C` (`--clay-d #A8451F` for small text on paper; `--clay-on-ink #D4703F`) |
| display/sans | Schibsted Grotesk |
| serif | Spectral |

Signature elements: the **defrag** mark (fragments → order), **spec frames** with clay corner-brackets, the dashed **drawline** rule, fixed **noise/grain** overlay, **frosted glass**, `kata` lockup with the tagline justified beneath it.

## Structure

`/` · `/services` · `/approach` · `/team` · `/contact`
Nav order: **Home · Services · Approach · Team · Contact** + a **Book a call** pill (right).

Almost all copy lives in **`lib/site.ts`**. Change it there, not in the pages.

## Decisions that are settled — don't undo these

- **`katamedia.cc` everywhere**, emails `@katamedia.cc` (the CI said `kata.media`; the client owns `.cc`).
- **Never say "front doors"** → it's **"How we engage"** (Audit / Workshop / Pilot).
- **Never mention the Kata Platform** — not ready to ship. Removed from the pillar list too.
- **Don't spell out "for brands & agencies"** in the hero lead.
- **Independence is stated exactly twice** — home hero ("without the conflicts built into the system") and Approach ("Independent judgement, applied in time"). It was said 4–5× and felt repetitive.
- **Every CTA opens the frosted-glass modal** — never navigates away.
- **Services leads with "How we engage"**, then the four pillars.

## Component notes

- **`Loader.tsx`** — plain solid defrag bars (glass/sheen versions were tried and rejected). Slow, readable settle, **3s hold**, caption **"FROM FRAGMENTS — ORDER."**. The grid + slogan align to the wordmark's **visible glyph ink** (via canvas `actualBoundingBox`), *not* its layout box — the box includes trailing letter-spacing and overhangs the letters. Once per session (`sessionStorage`).
- **`Nav.tsx`** — two independent states:
  - `solid` → glass appears on scroll (>12px)
  - `onLight` → text flips to ink **only when no ink section is behind the bar** (probes `.hero, .statement.ink` against the bar's midline). These must stay decoupled: the glass is only 20%, too sheer to normalise what's behind it.
  - **Dock animation** (borrowed from shift-media.io): flush at `top:0` and bare, then drops to 16px while the glass contracts from `left/right: -52px` → `0` and rounds `0` → `16px`, on `cubic-bezier(0.16, 1, 0.3, 1)`. Never animate `scale` on a backdrop-filter — it re-samples the blur and shimmers.
- **`Booking.tsx`** — provider + modal + `BookingButton`. Panel uses the same glass as the nav.
- **`Hero.tsx`** — desktop: watermark is an absolute bleed, bottom-right, with parallax. **Mobile (≤720px): the watermark joins the flow, ordered last**, so it can't overlap the copy; parallax disabled there.

## ⚠️ Open items

1. **THE CONTACT FORM DOES NOT SEND.** Highest priority. `lib/enquiry.ts` is the single swap-in point and throws `NotConfiguredError` **on purpose** so no enquiry is ever silently lost — but every "Book a call" on the live site currently ends in *"The form isn't connected yet."* The client chose **ship now, wire right after**, and picked **Web3Forms** (needs one free access key) — Resend is the better long-term option.
2. **`/approach` has never had a design pass** — it's the only page still as first drafted.
3. **"Now booking · 2026"** still appears 3× on `/contact` (hero kicker, caption, meta description). The pill was removed from the hero as useless; the client may want these gone too.

## Gotchas that cost real time

- **The in-app browser preview is heavily limited.** It cannot render `backdrop-filter`, does not advance CSS transitions, does not fire scroll events for programmatic `scrollTo`, and throttles `requestAnimationFrame`. Working code repeatedly *looked* broken. Verify by measuring computed values, injecting `*{transition:none}` to read end states, and dispatching `new Event('scroll')` manually.
- **Never run `npm run build` while `npm run dev` uses the same `.next`.** It poisons the cache and the dev server serves *stale CSS* — a change is on disk but not in the browser. Fix: `rm -rf .next` and restart dev.
- **DNS:** registrar Namecheap. `A @ → 216.198.79.1`, `CNAME www → b224b41abe4b3ecb.vercel-dns-017.com`. **Do not touch the two TXT records or Mail Settings — `MX: smtp.google.com` is live Google Workspace email.**
- The client's home router (Fritz!Box `192.168.178.1`) caches DNS aggressively; test on 5G before believing the site is down.

## Working with this client

Justin is **highly design-literate and very precise**. What he flags is almost always a real defect, not taste:

- He spotted that aligning to a text bounding box overhangs the glyphs — he was right.
- He spotted the nav going dark-on-dark over an ink band — a real bug.
- "Sloppy" from him usually means a genuine cause (a CSS collision, a scaled backdrop-filter, mismatched transition durations). **Find the cause, don't just nudge values.**

He moves fast, writes terse, and prefers a decision + a flag over a wall of questions. He wants things **minimal**. Show measurements, and be honest about what was verified vs assumed.
