# Briefing — claim hierarchy (round 2) + Kata origin

Founder decision, Jul 2026. **Code is written and on disk, uncommitted** —
verify and ship (can go in the same commit run as BRIEFING-ENQUIRY.md).

Changed files: `app/page.tsx` · `app/approach/page.tsx` ·
`components/FeatureHead.tsx` · `lib/site.ts` · `app/globals.css`.

## The decision, as shipped

- **"Knowledge applied to action"** — header lockup + footer only. Markenkern. Unchanged.
- **Hero headline** is now **"From fragments, order."** ("order." in clay).
  The old tag line under the headline is gone.
- **New hero subline** (`site.sub`): "We build and sharpen production
  structures for brands and agencies. Independently led." — audience, offer,
  credibility in one sentence. Cred band below still carries pedigree + the
  full independence statement.
- **"Better by design."** left the hero and sits as a clay crosshead
  (`kick` prop on FeatureHead, class `.fkick`) directly above "What we do".
- **Kata origin** on /approach, under the six-dimension grid (`.origin`):
  "Kata — Japanese for *form*. A sequence of movements, internalised through
  repetition, until it holds in any situation." (EN version of Cornelius's
  German line; the German original goes into the DE site later.)

## Verify + ship

1. `git status` — only the five files above (plus the enquiry files if not
   yet shipped).
2. `npm run build` && `npm run lint` — verified green once already.
3. Eyeball `/` (hero, crosshead) and `/approach` (origin block) in dev.
4. Commit + push to `main`.
5. Update HANDOFF.md's claims-hierarchy bullet to match "The decision" above.

Note: the footer/loader defrag caption still reads "From fragments — order."
— that now doubles the hero headline. Deliberate for v1 (it is the load
motif), but if the founders find it repetitive, the defrag caption is the
one to change, never the hero.
