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

    // fragmented start (set pre-paint — no flash)
    items.forEach((c) => {
      const r = Math.random();
      c.className = r < 0.42 ? "frag" : r < 0.64 ? "free" : "";
    });
    gsap.set([root.querySelector(".lk-mk"), root.querySelector(".lcap")], {
      autoAlpha: 0,
    });

    const settleEnd = SETTLE_START + n * EACH + TRANS;

    const tl = gsap.timeline();
    // the mark
    tl.to(
      root.querySelector(".lk-mk"),
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
      root.querySelector(".lcap"),
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
