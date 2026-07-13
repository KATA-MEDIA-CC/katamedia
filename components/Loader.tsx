"use client";

import { useRef, useState } from "react";
import { gsap, useIsoLayoutEffect, prefersReducedMotion } from "@/lib/gsap";
import { lockScroll, unlockScroll } from "@/lib/scrollLock";
import { site } from "@/lib/site";

const CELLS = 48;
const KEY = "kata:loaded";

// The defrag load screen. Ink overlay, the mark, the bars fragment then settle
// into order, then the screen wipes up. Shown once per session.
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
      // Skip instantly (pre-paint) — no flash on same-session reloads.
      gsap.set(root, { autoAlpha: 0 });
      setDone(true);
      return;
    }

    const items = Array.from(bars.querySelectorAll<HTMLElement>("i"));

    if (prefersReducedMotion()) {
      finish();
      return;
    }

    lockScroll();

    // fragment
    items.forEach((c) => {
      const r = Math.random();
      c.className = r < 0.42 ? "frag" : r < 0.64 ? "free" : "";
    });

    const tl = gsap.timeline();
    tl.from(root.querySelector(".lk-mk"), {
      autoAlpha: 0,
      y: 10,
      duration: 0.5,
      ease: "power2.out",
    });
    // settle into order (stagger)
    const order = Math.floor(items.length * 0.62);
    tl.add(() => {
      items.forEach((c, i) => {
        gsap.delayedCall(i * 0.028, () => {
          c.className = i < order ? (i % 8 === 5 ? "mark" : "") : "free";
        });
      });
    }, "+=0.15");
    // hold, then wipe up
    tl.to(root, {
      yPercent: -100,
      duration: 0.85,
      ease: "power4.inOut",
      onComplete: finish,
      delay: 0.85,
    });

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
          Defragmenting — <b>bringing order</b>
        </span>
      </div>
    </div>
  );
}
