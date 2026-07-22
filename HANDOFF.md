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
- **Every CTA opens the frosted-glass modal** — never navigates away.
- **Services leads with "How we engage"**, then the four pillars.

### Founder-feedback round, July 2026 (Cornelius + Jahnke sign-off)

- **Home is the whole story, not a teaser** — hardly anyone clicks deeper. Order: Hero → cred band → What we do → How we engage → The method (six dimensions, icon + label) → The founders (cards → /team) → CTA.
- **Cred band** (`components/Cred.tsx`, data in `cred` in `lib/site.ts`): 50+ years, the five houses, the independence line — directly under the home hero, on ink.
- **Independence is now stated three times on purpose** — cred band, Approach, footer. This supersedes the earlier "exactly twice" rule: the founders asked for it on the first screen and in the footer.
- **The word "kickback" is banned** (Cornelius: negatively loaded). Independence = "no financial ties", never "no kickbacks".
- **Claims hierarchy (round 2, Jul 2026):** "Knowledge applied to action" is THE brand claim (header lockup + footer). "From fragments, order." is the home hero headline ("order." in clay), with a one-sentence subline under it (audience · offer · credibility). "Better by design." sits as the clay crosshead before "What we do", out of the hero. The Japanese origin of "Kata" lives on /approach under the six-dimension grid. No two claims ever share one breath. (Footer + loader keep the em-dash brand line "From fragments — order." — the only sanctioned em-dash.)
- **No decorative 01/02/03 numbering** — section spec-frames and card numbers removed (`FeatureHead`'s `no` prop is now optional and unused). Numbers stay only where they mean something: the contact "what happens next" steps and the network's 01–12 directory index.
- **No bullet lists in copy** — the pillar `items` arrays became one `detail` prose paragraph each (renders as `.p-detail` on /services). Bullets read as machine-written.
- **Footer carries email, LinkedIn and the independence line.** ⚠️ The LinkedIn URL in `site.linkedin` is a guess (`/company/katamedia`) — confirm the real slug before relying on it.
- **References/logos**: deliberately empty `references` scaffold (commented out in `lib/site.ts`) — fill and render a logo strip as soon as there is something Kata may show.
- **Nav appears twice in the DOM by design** — desktop `.nav-links` + mobile `.sheet`, correctly gated with `aria-hidden`/`inert`. Not a bug; Jahnke's tech-check question, answered.

## Component notes

- **`Loader.tsx`** — plain solid defrag bars (glass/sheen versions were tried and rejected). Slow, readable settle, **3s hold**, caption **"FROM FRAGMENTS — ORDER."**. The grid + slogan align to the wordmark's **visible glyph ink** (via canvas `actualBoundingBox`), *not* its layout box — the box includes trailing letter-spacing and overhangs the letters. Once per session (`sessionStorage`).
- **`Nav.tsx`** — **one** state: `solid` (docked), set on scroll >12px. The old `onLight` probe is gone — the dock's tint is ink, so the bar is dark in both states and the text is paper throughout.
  - **The dock** is ported 1:1 from shift-media.io (read off its live inline styles) and retinted. Flush + bare at `top:0`; docked it goes `left/right:16px`, `top:12px`, `radius:20px`, `padding: var(--gut) → 28px`, `blur(20px)`, all on `cubic-bezier(0.16, 1, 0.3, 1)` / 0.5s (glass fades on 0.4s ease). The **padding collapse is what makes the text appear to grow** — nothing scales. Their logo is 16px in both states.
  - The glass lives on **`.nav` itself**, not a pseudo-element, because left/right/padding animate on the bar.
  - Never animate `scale` on a backdrop-filter — it re-samples the blur and shimmers.
  - **Tint is `rgba(26,24,19,0.70)`, not their 0.55.** At 0.55 the dock composites to mid-grey over a paper section and the links fall to 3.07:1. 0.70 is the lowest tint clearing 4.5:1 everywhere. **Clay cannot be dock text at any usable tint** (1.26:1 at 0.55; needs ~0.95) — hence `.nav.solid .nav-tag` flips the tagline to paper, keeping clay on the ink hero.
- **`Booking.tsx`** — provider + modal + `BookingButton`. Panel uses the same glass as the nav.
- **`Hero.tsx`** — desktop: watermark is an absolute bleed, bottom-right, with parallax. **Mobile (≤720px): the watermark joins the flow, ordered last**, so it can't overlap the copy; parallax disabled there.

## ⚠️ Open items

1. **`/approach` has never had a design pass** — it's the only page still as first drafted.
2. **"Now booking · 2026"** still appears 3× on `/contact` (hero kicker, caption, meta description). The pill was removed from the hero as useless; the client may want these gone too.

## Contact form (Web3Forms)

Wired and verified end-to-end. `lib/enquiry.ts` is the only file that talks to the provider.

- Enquiries go to **hello@katamedia.cc** — a Google **Group** (not an alias) with all three founders as members. Also `site.email`, and the fallback shown if sending fails.
- Key lives in `NEXT_PUBLIC_WEB3FORMS_KEY` (`.env.local` locally, Vercel env vars in prod). **Public by design** — Web3Forms keys are meant to be embedded client-side and this one is inlined into the browser bundle. It only ever mails its own registered address.
- **The site is static, so the key is baked in at BUILD time.** Changing it in Vercel does nothing until a redeploy.
- **The fetch must stay client-side.** Web3Forms answers 403 "Use our API in client side" to server IPs on the free plan — a server action or route handler would break it. Moving to Resend is the fix if that's ever needed.
- Checks `body.success`, not just `res.ok`: Web3Forms returns **200 with `{success:false}`** for a bad or throttled key, so `res.ok` alone would report a dropped enquiry as delivered.
- Honeypot is the `website` field; if filled, the form shows the success state and sends nothing (verified: zero fetches).

**The failure mode to watch:** the Google Group must allow **External** senders under Access settings → *Who can post*. Web3Forms sends from their own servers, so if External is blocked, Google bounces the mail **after** Web3Forms has already returned `success: true` — the site says "Sent" and the enquiry is gone. `NotConfiguredError` cannot catch this; it happens downstream. If enquiries ever stop arriving, check that setting first.

## Gotchas that cost real time

- **NEVER hand-write `-webkit-backdrop-filter`.** This shipped broken for weeks: all four glass surfaces (`.nav.solid`, `.kglass`, `.bk-panel`, `.bk-backdrop`) rendered as a flat tint with **no blur at all**, and the symptom ("it looks like opacity, not glass") got misread as a design problem twice. Lightning CSS treats `backdrop-filter` and `-webkit-backdrop-filter` as one logical property; given a hand-written prefixed form it emits **only** the prefixed one. **Chrome does not support `-webkit-backdrop-filter`** — `CSS.supports('-webkit-backdrop-filter','blur(20px)')` is `false` in Chrome 148 — so the declaration was dropped and `getComputedStyle(el).backdropFilter` returned `none`. Safari was unaffected, which is why it hid. Write **only** the standard property and let Lightning add prefixes from its targets. Verify with `grep -c '[;{]backdrop-filter:'` on the built CSS: it must match the `-webkit-` count, not be 1.

- **The in-app browser preview is heavily limited.** It cannot render `backdrop-filter` — it drops the *entire element's layer*, so a `.nav.solid` screenshot comes back blank even though the DOM is correct. It also does not advance CSS transitions (computed styles freeze at the *start* value, so a correctly-applied class looks like it did nothing) and throttles `requestAnimationFrame`, so GSAP reveals never run. Working code repeatedly *looked* broken. Verify by measuring computed values and injecting `*{transition:none}` to read end states. `scrollTo` **does** work, but only with `behavior:'instant'` — `html{scroll-behavior:smooth}` otherwise animates it and `scrollY` reads 0 in the same tick.
- **Never run `npm run build` while `npm run dev` uses the same `.next`.** It poisons the cache and the dev server serves *stale CSS* — a change is on disk but not in the browser. Fix: `rm -rf .next` and restart dev.
- **DNS:** registrar Namecheap. `A @ → 216.198.79.1`, `CNAME www → b224b41abe4b3ecb.vercel-dns-017.com`. **Do not touch the two TXT records or Mail Settings — `MX: smtp.google.com` is live Google Workspace email.**
- The client's home router (Fritz!Box `192.168.178.1`) caches DNS aggressively; test on 5G before believing the site is down.

## Working with this client

Justin is **highly design-literate and very precise**. What he flags is almost always a real defect, not taste:

- He spotted that aligning to a text bounding box overhangs the glyphs — he was right.
- He spotted the nav going dark-on-dark over an ink band — a real bug.
- "Sloppy" from him usually means a genuine cause (a CSS collision, a scaled backdrop-filter, mismatched transition durations). **Find the cause, don't just nudge values.**

He moves fast, writes terse, and prefers a decision + a flag over a wall of questions. He wants things **minimal**. Show measurements, and be honest about what was verified vs assumed.
