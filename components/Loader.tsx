"use client";

import { useRef, useState } from "react";
import { gsap, useIsoLayoutEffect, prefersReducedMotion } from "@/lib/gsap";
import { lockScroll, unlockScroll } from "@/lib/scrollLock";
import { site } from "@/lib/site";

const CELLS = 36;
const KEY = "kata:loaded";

// timing (seconds)
const MARK_IN = 0.6;
const SETTLE_START = 1.0; // hold the fragmented state a beat first
const EACH = 0.05; // stagger per cell — slow enough to read the defragmenting
const TRANS = 0.5; // matches the CSS transition on .defrag i
const HOLD = 3.0; // hold the finished ordered state before revealing the site

// The defrag load screen. Solid bars fragment into disorder, then settle
// cell-by-cell into an ordered row, hold, and the screen wipes up. Once per
// session.
export function Loader() {
  const [done, setDone] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const barsRef = useRef<HTMLSpanElement>(null);

  useIsoLayoutEffect(() => {
    const root = rootRef.current;
    const bars = barsRef.current;
    if (!root || !bars) return;

    let already = false;
    try {
      already = !!sessionStorage.getItem(KEY);
    } catch {}

    const finish = () => {
      try {
        sessionStorage.setItem(KEY, "1");
      } catch {}
      unlockScroll();
      setDone(true);
    };

    if (already) {
      gsap.set(root, { autoAlpha: 0 });
      setDone(true);
      return;
    }

    if (prefersReducedMotion()) {
      finish();
      return;
    }

    lockScroll();

    const items = Array.from(bars.querySelectorAll<HTMLElement>("i"));
    const n = items.length;
    const order = Math.floor(n * 0.62);
    const mk = root.querySelector<HTMLElement>(".lk-mk");
    const cap = root.querySelector<HTMLElement>(".lcap");

    // Measure the wordmark's *visible glyph ink* — not its layout box, which
    // includes the trailing letter-spacing after the final A and so is always
    // wider than the actual letters. Align the grid + slogan to those true ink
    // edges (first bar under the K, last under the A). A ResizeObserver re-runs
    // it whenever the wordmark reflows (e.g. after the web font loads).
    const measureVisible = () => {
      const el = mk as HTMLElement;
      const cs = getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      const lsPx = parseFloat(cs.letterSpacing) || 0;
      const boxCenter = rect.left + rect.width / 2;
      try {
        const ctx = document.createElement("canvas").getContext("2d");
        if (ctx) {
          ctx.font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
          (ctx as CanvasRenderingContext2D & { letterSpacing?: string }).letterSpacing =
            cs.letterSpacing;
          const m = ctx.measureText((el.textContent || "").toUpperCase());
          const l = m.actualBoundingBoxLeft;
          const r = m.actualBoundingBoxRight;
          if (typeof l === "number" && typeof r === "number") {
            const left = rect.left - l;
            const right = rect.left + r;
            const w = right - left;
            // guard against garbage from a not-yet-loaded font (canvas falls
            // back to a default face and reports a nonsense width)
            if (w > rect.width * 0.6 && w <= rect.width + 4) {
              return { left, right, boxCenter };
            }
          }
        }
      } catch {}
      // fallback: strip the trailing letter-spacing from the layout box
      return { left: rect.left, right: rect.right - lsPx, boxCenter };
    };

    const matchWidth = () => {
      if (!mk) return;
      const v = measureVisible();
      const width = v.right - v.left;
      if (width <= 40) return;
      const shift = (v.left + v.right) / 2 - v.boxCenter; // to the visible centre
      bars.style.width = `${width}px`;
      bars.style.justifyContent = "space-between";
      bars.style.gap = "0px";
      bars.style.transform = `translateX(${shift}px)`;
      if (cap) {
        cap.style.width = "";
        cap.style.textAlignLast = "";
        cap.style.transform = "";
        // span the slogan to the same ink width when it fits; on small screens
        // the long line is wider than the 4-letter mark, so leave it centred.
        if (width >= cap.scrollWidth) {
          cap.style.width = `${width}px`;
          cap.style.textAlignLast = "justify";
          cap.style.transform = `translateX(${shift}px)`;
        }
      }
    };
    matchWidth();
    document.fonts?.ready?.then(matchWidth).catch(() => {});
    // Re-measure across the first ~1.2s: the canvas can't report correct glyph
    // metrics until the web font is actually loaded, so poll briefly until it
    // locks onto the real face.
    let ticks = 0;
    const iv = window.setInterval(() => {
      matchWidth();
      if (++ticks >= 8) window.clearInterval(iv);
    }, 150);
    let ro: ResizeObserver | undefined;
    if (mk && typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => matchWidth());
      ro.observe(mk);
    }

    // fragmented start (set pre-paint — no flash)
    items.forEach((c) => {
      const r = Math.random();
      c.className = r < 0.42 ? "frag" : r < 0.64 ? "free" : "";
    });
    gsap.set([mk, cap], { autoAlpha: 0 });

    const settleEnd = SETTLE_START + n * EACH + TRANS;

    const tl = gsap.timeline();
    // the mark
    tl.to(
      mk,
      { autoAlpha: 1, y: 0, duration: MARK_IN, ease: "power2.out", startAt: { y: 12 } },
      0
    );
    // settle each cell into order, left to right
    items.forEach((c, i) => {
      tl.call(
        () => {
          c.className = i < order ? (i % 8 === 5 ? "mark" : "") : "free";
        },
        undefined,
        SETTLE_START + i * EACH
      );
    });
    // caption resolves as order lands
    tl.to(
      cap,
      { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out", startAt: { y: 8 } },
      settleEnd - 0.9
    );
    // hold the ordered state, then wipe up
    tl.to(
      root,
      { yPercent: -100, duration: 0.9, ease: "power4.inOut", onComplete: finish },
      settleEnd + HOLD
    );

    return () => {
      tl.kill();
      ro?.disconnect();
      window.clearInterval(iv);
      unlockScroll();
    };
  }, []);

  if (done) return null;

  return (
    <div ref={rootRef} className="loader" role="status" aria-label="Loading">
      <div className="loader-inner">
        <span className="lk-mk">{site.wordmark}</span>
        <span ref={barsRef} className="defrag lg dk" aria-hidden="true">
          {Array.from({ length: CELLS }).map((_, i) => (
            <i key={i} />
          ))}
        </span>
        <span className="lcap">
          From fragments — <b>order.</b>
        </span>
      </div>
    </div>
  );
}
