# Kata — katamedia.cc

The website for **Kata**, an independent production advisory for brands and agencies.
Editorial "paper · ink · clay" identity, built to the Kata CI system.

**Stack:** Next.js 16 (App Router) · React 19 · Tailwind CSS v4 · GSAP · TypeScript
Fully static, mobile-first, deploy-ready for Vercel.

---

## Run it locally

You need [Node.js](https://nodejs.org) 20 or newer (this project was built on Node 22).

```bash
npm install        # first time only — installs dependencies
npm run dev        # start the dev server
```

Then open **http://localhost:3000**.

Other commands:

```bash
npm run build      # production build (what Vercel runs)
npm run start      # serve the production build locally
npm run lint       # check code
```

> On this Mac, Node was installed to `~/.local/nodejs` and added to your `~/.zshrc`.
> Open a new terminal and `node -v` should print `v22.x`. If not, restart your terminal.

---

## Deploy to Vercel

1. **Push to GitHub** (see below).
2. Go to [vercel.com/new](https://vercel.com/new) and **import** the repository.
3. Vercel auto-detects Next.js — no configuration needed. Click **Deploy**.
4. In the project's **Settings → Domains**, add `katamedia.cc` and follow the DNS steps.

### Push to GitHub

Create an empty repo on GitHub (no README/license), then:

```bash
git remote add origin https://github.com/<your-username>/katamedia.git
git branch -M main
git push -u origin main
```

Every push to `main` triggers an automatic redeploy on Vercel.

---

## Editing the site

Almost all wording lives in **one file** — `lib/site.ts`:

| What | Where in `lib/site.ts` |
| --- | --- |
| Domain, tagline, hero copy, booking label | `site` |
| Navigation items | `nav` |
| Founders (names, roles, emails, bios) | `founders` |
| The four service pillars | `pillars` |
| The three "front doors" (Audit/Workshop/Pilot) | `frontDoors` |
| The six Method dimensions | `dimensions` |
| The four ways to engage | `engagements` |

Change the text there and every page updates. Colours, fonts and the design
system live in `app/globals.css` (ported 1:1 from the Kata CI).

### Pages

```
app/
  page.tsx            Home
  approach/page.tsx   Approach — belief, the Method, ways to engage
  services/page.tsx   Services — four pillars, the Platform, front doors, who we work with
  contact/page.tsx    Contact — the founding partners
```

### Brand components

```
components/
  Loader.tsx      the defrag load screen (once per session)
  Nav.tsx         fixed nav → mobile sheet menu
  Hero.tsx        ink hero with watermark + GSAP intro
  Defrag.tsx      the signature "fragments → order" mark
  Reveal.tsx      GSAP fade-in-on-scroll wrapper
  FeatureHead.tsx numbered spec frame + drawn ruler
  Footer.tsx      colophon
  Icons.tsx       the four pillar icons
  Lockup.tsx      the kata wordmark lockup
```

---

## Notes

- **Design fidelity:** v1 sticks to the Kata CI system 1:1 — paper `#F6F2E8`,
  ink `#1A1813`, clay `#C0532C`; Schibsted Grotesk (display) + Spectral (serif),
  both loaded via `next/font`.
- **Animations:** GSAP + ScrollTrigger drive the loader, hero intro, scroll
  reveals, the drawn rules, and the defrag mark. All respect
  `prefers-reduced-motion`.
- **Social image, favicon, sitemap, robots** are generated automatically
  (`app/opengraph-image.tsx`, `app/icon.svg`, `app/sitemap.ts`, `app/robots.ts`).
