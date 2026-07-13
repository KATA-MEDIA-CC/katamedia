"use client";

import { useRef, ReactNode, CSSProperties } from "react";
import { gsap, useIsoLayoutEffect, prefersReducedMotion } from "@/lib/gsap";

// Fade + rise on scroll-in. Set `stagger` to animate direct children in
// sequence instead of the wrapper as a whole. Hides targets pre-paint (layout
// effect) so there is no flash; if JS is off the content simply stays visible.
export function Reveal({
  children,
  className = "",
  stagger = false,
  y = 16,
  delay = 0,
  style,
}: {
  children: ReactNode;
  className?: string;
  stagger?: boolean;
  y?: number;
  delay?: number;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets: Element[] = stagger ? Array.from(el.children) : [el];
    if (!targets.length) return;

    if (prefersReducedMotion()) {
      gsap.set(targets, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(targets, { opacity: 0, y });
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: 0.85,
        delay,
        ease: "power3.out",
        stagger: stagger ? 0.09 : 0,
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
    }, el);
    return () => ctx.revert();
  }, [stagger, y, delay]);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
