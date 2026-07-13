"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useIsoLayoutEffect, prefersReducedMotion } from "@/lib/gsap";

// The defrag mark: fragments resolve into order. Non-loop settles once when
// scrolled into view; loop variants keep cycling while visible.
export function Defrag({
  cells = 26,
  size = "",
  dark = false,
  loop = false,
  loopCount = 0,
  className = "",
}: {
  cells?: number;
  size?: "" | "lg";
  dark?: boolean;
  loop?: boolean;
  loopCount?: number; // 0 = loop indefinitely; N = settle after N cycles
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const items = Array.from(el.querySelectorAll<HTMLElement>("i"));
    const RM = prefersReducedMotion();

    const fragmentize = () =>
      items.forEach((c) => {
        const r = Math.random();
        c.className = r < 0.42 ? "frag" : r < 0.64 ? "free" : "";
      });

    const settle = () => {
      const n = items.length;
      const order = Math.floor(n * 0.62);
      items.forEach((c, i) => {
        const ms = RM ? 0 : i * 30;
        gsap.delayedCall(ms / 1000, () => {
          c.className = i < order ? (i % 8 === 5 ? "mark" : "") : "free";
        });
      });
    };

    if (RM) {
      settle();
      return;
    }

    if (!loop) {
      fragmentize();
      const st = ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        once: true,
        onEnter: () => gsap.delayedCall(0.22, settle),
      });
      return () => st.kill();
    }

    // loop variant
    let visible = true;
    let ran = 0;
    const runOnce = () => {
      fragmentize();
      gsap.delayedCall(0.7, settle);
      ran += 1;
    };
    runOnce();
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top bottom",
      end: "bottom top",
      onToggle: (self) => (visible = self.isActive),
    });
    const id = setInterval(() => {
      if (!visible) return;
      if (loopCount && ran >= loopCount) {
        clearInterval(id);
        return;
      }
      runOnce();
    }, 2600);
    return () => {
      clearInterval(id);
      st.kill();
    };
  }, [loop, loopCount]);

  return (
    <span
      ref={ref}
      className={`defrag ${size} ${dark ? "dk" : ""} ${loop ? "loop" : ""} ${className}`.trim()}
      aria-hidden="true"
    >
      {Array.from({ length: cells }).map((_, i) => (
        <i key={i} />
      ))}
    </span>
  );
}
