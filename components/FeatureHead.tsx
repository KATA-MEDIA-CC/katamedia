"use client";

import { useRef, ReactNode } from "react";
import { gsap, useIsoLayoutEffect, prefersReducedMotion } from "@/lib/gsap";

// Section header: title (with clay <em>) · deck · the drawn measuring rule.
// The rule scales in from the left on scroll.
//
// `no` (the numbered spec frame) is optional and currently unused: the founders
// asked for the 01/02/03 section numbering to go (Jul 2026) — with sections
// added and removed per page, the sequences kept reading as half-finished. The
// frame renders again the moment a caller passes `no`.
export function FeatureHead({
  no,
  title,
  deck,
}: {
  no?: string;
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
    <div className={`g12 fhead${no ? "" : " bare"}`}>
      {no ? (
        <span className="mk">
          <span className="spec">
            <span className="no">{no}</span>
          </span>
        </span>
      ) : null}
      <h2>{title}</h2>
      {deck ? <p className="deck">{deck}</p> : null}
      <span ref={lineRef} className="drawline" />
    </div>
  );
}
