# Briefing — Cornelius comment round (Jul 2026)

**Code is on disk, uncommitted** — verify and ship (combinable with any other
pending briefing in one run). Build + lint verified green once already.

Changed: `lib/site.ts` · `lib/enquiry.ts` · `components/Cred.tsx` ·
`components/Booking.tsx` · `components/ContactForm.tsx` ·
`components/Footer.tsx` · `components/EntryCards.tsx` (new) · `app/page.tsx` ·
`app/services/page.tsx` · `app/approach/page.tsx` · `app/team/page.tsx` ·
`app/contact/page.tsx` · `app/imprint/page.tsx` (new) ·
`app/privacy/page.tsx` (new) · `app/globals.css`.

## Shipped fixes (CR's numbering)

- HOME 1 (superseded same day): the savings percentage is OUT entirely —
  also the softer "benchmark data suggests" version. Audit body is now:
  "Your production setup: mapped and scored across all six dimensions of the
  Method, against rates we have negotiated ourselves. Where cost leaks, you
  see it line by line." Rule going forward: no unevidenced numbers anywhere.
- HOME 2+3 / SERVICES 1+2: engage-deck now names the three ways and resolves
  the fee inconsistency: "…an audit, a workshop or a pilot. Each one: fixed
  scope, a fee agreed before we start, and a recommendation you keep…".
  Services meta description matched.
- HOME 5: cred band → "45+ years" (15+20+12 = 47 after the Markenfilm
  correction; comment in site.ts documents the math) and "Experience built
  at …" instead of "Made at …".
- HOME 6 / TEAM 1: Cornelius — card "Twenty years at Markenfilm…", role
  "Strategy, production controlling and executive production", full new
  4-paragraph bio verbatim. Flows to /team, home cards and /contact
  automatically.
- HOME 7: "A 45-minute call" hyphenated everywhere (CTA bands, booking
  modal, contact steps, contact meta).
- SERVICES 3: "Method" in the audit card links to /approach (new shared
  `EntryCards` component, `.mlink` style).
- APPROACH 0: method deck now frames the engagements: "The Method frames
  every engagement: the audit scores all six dimensions, workshops and pilots
  go deep on one or two."
- APPROACH 1: "RAG-scored" → "Scored red, amber or green across all six
  dimensions".
- APPROACH 2: "Nobody knows…" → "We've worked in the German market for
  years. … We know it from the inside."
- TEAM 2 (contradiction): network deck → "Open a sector to see what they do,
  and when they come in." (no longer promises names the panel then refuses).
- CONTACT: Role/Need/Timing marked "· optional" (Name, Email, Company,
  Message remain required) · "Later in 2026" → "Later this year" (year-proof)
  · GDPR line above Send linking /privacy. NOTE: the post-submit
  "Thank you, we'll come back within 24 hours" state ALREADY exists
  (`form-done` in ContactForm) — nothing to build, tell Cornelius.
- LEGAL: /imprint + /privacy scaffolded (German, DRAFT-banner, [PLACEHOLDER]
  fields), footer links "Impressum · Datenschutz" added.

## Blocked on Justin (legal placeholders)

/imprint and /privacy ship with a visible draft banner until these are
filled: street address · Geschäftsführer names · Amtsgericht + HRB ·
USt-IdNr. · retention period for enquiries. Then remove the banners and have
a lawyer look over both pages. Do NOT remove the banners with placeholders
still inside.

## NOT implemented — founder decisions still open

1. Independence appears 3× on home (hero "Independently led." · cred band ·
   footer). CR asks if that's too much. Interacts with:
2. SEO: suggestion to make the subline keyword-sharper ("Independent
   production advisory for brands and agencies"). One change could solve
   both — swap the subline and the count stays at 3 but the hero instance
   earns its keep. Founders to decide; one string in `site.ts` (`sub`).
3. Network names (Dan/Stefan, Dalia, Arno, Cissy Walde, Kai/Crossmedia,
   Tobias Bier…): internal candidate list, not website copy. Site stays
   deliberately unnamed for now (settled rule in site.ts comments).

## Ship checklist

`git status` → build → lint → eyeball /, /services, /approach, /team,
/contact, /imprint, /privacy → commit + push. Update HANDOFF.md: cred-band
years now 45+, Cornelius bio/role changed, legal pages exist as drafts.
