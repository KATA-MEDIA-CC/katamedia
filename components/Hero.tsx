"use client";

import { ReactNode, useRef } from "react";
import { gsap, useIsoLayoutEffect, prefersReducedMotion } from "@/lib/gsap";
import { site } from "@/lib/site";

export function Hero({
  variant = "page",
  lead,
  title,
  tag = site.tagline,
  desc,
  watermark = site.wordmark,
}: {
  variant?: "home" | "page";
  lead: ReactNode;
  title: ReactNode;
  tag?: string;
  desc?: ReactNode;
  watermark?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const wm = el.querySelector<HTMLElement>(".hero-wm");

    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const targets = el.querySelectorAll<HTMLElement>("[data-hero]");
      gsap.set(targets, { opacity: 0, y: 20 });
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.1,
        delay: 0.15,
      });
      if (wm) {
        gsap.fromTo(
          wm,
          { opacity: 0, scale: 1.04 },
          { opacity: 1, scale: 1, duration: 1.4, ease: "power2.out" }
        );
        gsap.to(wm, {
          yPercent: -12,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className={`hero ${variant === "home" ? "hero--home" : "hero--page"}`}
    >
      <span className="hero-wm" aria-hidden="true">
        {watermark}
      </span>
      <div className="wrap">
        <p className="hero-lead" data-hero>
          {lead}
        </p>
        <h1 className="hero-title" data-hero>
          {title}
        </h1>
        <p className="hero-tag" data-hero>
          {tag}
        </p>
        {desc && (
          <div className="hero-foot" data-hero>
            <p className="hero-desc">{desc}</p>
          </div>
        )}
      </div>
    </section>
  );
}
