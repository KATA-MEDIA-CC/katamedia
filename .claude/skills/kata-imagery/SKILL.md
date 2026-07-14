---
name: kata-imagery
description: How photographs are treated on every Kata surface — the Option-05 bracket frame, the paper/ink duotone, and the six motion options (A draw-in, B settle, C focus, C.1 zoom, D scan, E develop). Use whenever adding, replacing, cropping, animating or reviewing ANY image on a Kata surface (site, deck, social, OG card), or when asked how images should look or move. The base CI has no photography spec; this is it.
---

# Kata — Imagery

The delivered CI (`kata-ci` skill) has **no photography treatment** — its only image
container is `.mthumb`, a bare 4:3 box. This skill is the photography spec. Together:
`kata-ci` owns palette, type and the lockup; **this owns anything with a photograph in it.**

## Do this first

1. Read `reference/imagery.css` — the canonical treatment, lifted verbatim from the
   source doc. **Use these class names.** Don't re-derive the filter stack or the
   bracket geometry.
2. To see all six motions side by side, open `reference/kata-imagery-motion.html`
   in a browser. The loops run automatically; **C and C.1 are hover-only.**

## The plate — non-negotiable

Every photograph is:

- **3:2**, `overflow:hidden`, on an `--ink` ground (`.shot`)
- filtered `grayscale(1) sepia(.08) contrast(1.05) brightness(1.02)`
- under **two blend layers**: `--ink` at 14% `multiply` (into the shadows) and
  `--paper` at 12% `screen` (into the highlights)

**Those three things together are the whole point.** They print the photograph *in*
Kata's inks. Skip them and a neutral b&w picture with #FFF whites sits on #F6F2E8
cream and reads as a cold cutout pasted on the page. This is the CSS answer to what
would otherwise be a Photoshop job — zero build step, and it applies to any photo
dropped in later.

## The bracket frame (Option 05)

Four **clay** registration ticks — 18px, 1.5px, inset `-7px` — held **outside** the
plate. The container (`.brkt`) must not clip, or the ticks vanish.

```html
<div class="brkt c1-zoom">
  <div class="shot"><img src="…" alt=""></div>
  <span class="tk tl"></span><span class="tk tr"></span>
  <span class="tk bl"></span><span class="tk br"></span>
</div>
```

Note this is a **deliberate exception** to the CI's clay discipline: clay is otherwise
display-only and never a frame. Here it is the registration mark, and it earns it.

## Motion — pick exactly ONE per surface

| | Trigger | What it says | Use for |
| --- | --- | --- | --- |
| **A · Draw-in** | on load | corners struck like registration marks; photo still | grids, many images at once |
| **B · Settle** | on load | picture eases up out of scale + gloom | a single hero image |
| **C · Focus** | hover | rest is *genuinely* soft; hover pulls sharp, reticle converges | one image that rewards attention |
| **C.1 · Zoom** | hover | sharp at rest; hover pushes in, reticle opens | **the founders** — chosen |
| **D · Scan** | on load | a clay measure-line reads the image | a diagnostic/method context |
| **E · Develop** | on load | the print comes up out of the ink | film-direction moments |

**Never combine two.** They all move the same two elements and will fight.

Everything here is decoration — the meaning is always in the words. All of it is
disabled under `prefers-reduced-motion`, and nothing may depend on it having run.

## In this repo

- The treatment lives in `app/globals.css` under **THE FOUNDERS / IMAGERY**.
- The founders row uses **C.1**.
- **The founders override `.shot img`.** The spec's default is `inset:0; object-fit:cover`,
  which would show three different head sizes because the three portraits were shot at
  three different distances. Instead the image is absolutely positioned and scaled by a
  measured per-photo `--zoom` / `--ox` / `--oy` so every head renders the same size and
  every eyeline lands at the same height. The inputs (`ar` / `k` / `e`) are measured off
  each file and live next to the photo in `lib/site.ts`; the maths is in
  `components/Founders.tsx`. **Swap a portrait without re-measuring and the heads
  silently drift.**
- C.1's hover scale uses `transform-origin` at each face's own eye point, so the push-in
  happens *around the face* rather than around the image's centre — which, with offset
  images, would slide the face sideways.

## Gotchas

- `.brkt` must not have `overflow:hidden` — the ticks live outside the plate.
- The blend layers sit at `z-index:1` above the `<img>`; give the image no z-index.
- Lightning CSS: **never hand-write a vendor prefix** here (see the repo's HANDOFF) —
  it suppresses the standard property and Chrome drops it silently.
- Source files want ≥2× the largest rendered CSS width. A hard-cropped photo needs more
  pixels than its frame suggests; check before blaming the treatment for softness.
