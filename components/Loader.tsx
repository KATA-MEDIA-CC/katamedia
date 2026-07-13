"use client";

import { useRef, useState } from "react";
import { gsap, useIsoLayoutEffect, prefersReducedMotion } from "@/lib/gsap";
import { lockScroll, unlockScroll } from "@/lib/scrollLock";
import { site } from "@/lib/site";

const CELLS = 24;
const KEY = "kata:loaded";

// The defrag load screen. Ink overlay, the mark, then the glass slats assemble
// from disorder into an ordered row — "defragmenting → bringing order" — before
// the screen wipes up. Shown once per session.
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

    if (prefersReducedMotion()) {
      finish();
      return;
    }

    lockScroll();

    const items = gsap.utils.toArray<HTMLElement>(bars.querySelectorAll("i"));
    const rnd = gsap.utils.random;

    // fragmented start — scattered, dim, uneven (set pre-paint so no flash)
    gsap.set(items, {
      opacity: () => rnd(0.1, 0.4),
      y: () => rnd(-18, 18),
      scaleY: () => rnd(0.5, 1),
    });
    gsap.set([root.querySelector(".lk-mk"), root.querySelector(".lcap")], {
      autoAlpha: 0,
    });

    const tl = gsap.timeline();
    // the mark
    tl.to(root.querySelector(".lk-mk"), {
      autoAlpha: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out",
      startAt: { y: 12 },
    });
    // slats settle into order — left to right, slow enough to read
    tl.to(
      items,
      {
        opacity: 1,
        y: 0,
        scaleY: 1,
        duration: 0.75,
        ease: "power3.out",
        stagger: { each: 0.05, from: "start" },
      },
      "-=0.15"
    );
    // caption resolves as order lands
    tl.to(
      root.querySelector(".lcap"),
      { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out", startAt: { y: 8 } },
      "-=0.55"
    );
    // hold on the ordered state, then wipe up
    tl.to(
      root,
      {
        yPercent: -100,
        duration: 0.9,
        ease: "power4.inOut",
        onComplete: finish,
      },
      "+=0.7"
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
        <span ref={barsRef} className="defrag lg glass" aria-hidden="true">
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
