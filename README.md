# bureau-kata.com

The Kata website, CI V3.0. A static site plus one serverless function, deployed by Vercel from this repo.

| Path | What |
|---|---|
| `site/` | **Everything served.** The page, the legal pages, assets, self-hosted fonts. Nothing outside this folder has a URL. |
| `api/enquiry.js` | `POST /api/enquiry` — the contact form. Writes the enquiry to Attio (person, note, 24h task) and sends the auto-reply and internal notification through Resend. Needs `ATTIO_API_KEY` and `RESEND_API_KEY` in Vercel (see `.env.example`). |
| `vercel.json` | Serves `site/`, overrides the dashboard's old Next.js preset (no install, no build), keeps the old URLs (`/services`, `/team` …) working, sets caching and security headers. |

**Don't edit `site/` by hand.** It is generated from the design source by the build script (`build/build.py` in the design workspace). Change the source, rebuild, commit the output.

The Impressum is placeholder text by decision until the legal entity and address are settled.

The previous Next.js site is in the git history, up to commit `b52a1d0`.
