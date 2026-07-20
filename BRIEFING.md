# Briefing — ship the July 2026 founder-feedback round

Read `HANDOFF.md` first (project setup + settled decisions). Then do exactly this.

## Situation

Founder feedback (Cornelius + Jahnke) produced 10 action points. **They are already
implemented — the changes are on disk in this repo, uncommitted.** Your job is to
verify and ship them, not to redo them.

Changed files: `lib/site.ts` · `app/page.tsx` · `app/services/page.tsx` ·
`app/approach/page.tsx` · `app/team/page.tsx` · `app/contact/page.tsx` ·
`app/globals.css` · `components/FeatureHead.tsx` · `components/Founders.tsx` ·
`components/Footer.tsx` · `components/Icons.tsx` · `components/Cred.tsx` (new) ·
`HANDOFF.md` · this file.

## What was changed (verify each on `npm run dev`)

1. **Home = the whole story**, in this order: Hero → cred band → What we do →
   How we engage (Audit/Workshop/Pilot) → The method (six dimensions, icon +
   label) → The founders (3 cards → /team) → CTA.
2. **Hero:** headline stays "Better *by design.*"; the line under it is now
   "From fragments — order."; subline is `site.sub`. "Knowledge applied to
   action" appears ONLY in the nav lockup and footer.
3. **Cred band** (`components/Cred.tsx`): "50+ years of production leadership" ·
   The Mill · Stink · Psyop · Markenfilm · Jung von Matt · independence line.
4. **No decorative 01/02/03 numbering** anywhere (section spec-frames, cards,
   pillars). Numbers remain only on /contact "what happens next" steps and the
   network 01–12 index — that is intentional.
5. **No bullet lists** — /services pillars now render one `.p-detail` prose
   paragraph each.
6. **Footer** carries `hello@katamedia.cc`, LinkedIn, the independence line.
7. Founder photos on home use the same measured eye-line math as /team — heads
   must align across the three cards.

## Ship checklist

1. `git status` / `git diff` — review, confirm only the files listed above changed.
2. `npm run dev` — walk all five pages against the list above, desktop + mobile
   widths (cred band stacks <900px; dims grid 3→2→1 columns).
3. `npm run build` && `npm run lint` — both must be clean (already verified once).
4. Commit (one commit, message like `Founder feedback round: homepage as full
   story, cred band, no numbering/bullets, footer build-out`) and push to `main`
   — Vercel auto-deploys katamedia.cc.
5. Check the live site after deploy, including OG image and /contact form.

## Open items — do NOT ship guesses

- `site.linkedin` is a GUESS (`/company/katamedia`). Confirm the real slug with
  Justin before or right after deploy; fix in `lib/site.ts` if wrong.
- KATA ↔ Japanese origin ("kata" as practiced form): founders haven't decided.
  If they say yes, it belongs on /approach. Don't add it unprompted.
- `references` scaffold in `lib/site.ts` stays commented out until there are
  real logos/quotes Kata may show.

## Hard rules (from the founders — never regress these)

- The word **"kickback" is banned**. Independence = "no financial ties".
- Never pair "Knowledge applied to action" and "Better by design" in one breath.
- No bullet runs in copy, no decorative section numbering.
- Everything visual stays on the KATA CI (paper/ink/clay, Spectral + Schibsted).
