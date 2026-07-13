"use client";

import { useRef, ReactNode } from "react";
import { gsap, useIsoLayoutEffect, prefersReducedMotion } from "@/lib/gsap";

// Section header: numbered spec frame · title (with clay <em>) · deck · the
// drawn measuring rule. The rule scales in from the left on scroll.
export function FeatureHead({
  no,
  title,
  deck,
}: {
  no: string;
  title: ReactNode;
  deck?: string;
}) {
  const lineRef = useRef<HTMLSpanElement>(null);

  useIsoLayoutEffect(() => {
    const el = lineRef.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      el.classList.add("in");
      return;
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.1,
          ease: "power3.inOut",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div className="g12 fhead">
      <span className="mk">
        <span className="spec">
          <span className="no">{no}</span>
        </span>
      </span>
      <h2>{title}</h2>
      {deck ? <p className="deck">{deck}</p> : null}
      <span ref={lineRef} className="drawline" />
    </div>
  );
}
