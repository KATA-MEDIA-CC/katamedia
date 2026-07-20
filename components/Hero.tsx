"use client";

import { ReactNode, useRef } from "react";
import { gsap, useIsoLayoutEffect, prefersReducedMotion } from "@/lib/gsap";
import { site } from "@/lib/site";

export function Hero({
  variant = "page",
  lead,
  title,
  tag,
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

  // Optical left alignment.
  //
  // Every glyph carries a left side bearing — empty space between the text
  // box's edge and the first pixel of ink. The box edges here are identical to
  // 0.00px, but the bearing is a fraction of the FONT SIZE, so the kicker at
  // 10px is out by 0.4px and the headline at 200px is out by ~15px. The stack
  // is aligned by its boxes and visibly ragged by its ink.
  //
  // The bearing is constant in em, so measure once and write it as em: CSS then
  // rescales it at every breakpoint with no resize listener. Fonts must have
  // loaded first or we would measure the fallback face and bake in its numbers.
  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = document.createElement("canvas").getContext("2d");
    if (!ctx) return;

    const align = () => {
      el.querySelectorAll<HTMLElement>("[data-optical]").forEach((t) => {
        const raw = t.textContent?.trimStart();
        if (!raw) return;
        const cs = getComputedStyle(t);
        // measure the glyph that actually renders, not the one in the source
        const ch =
          cs.textTransform === "uppercase" ? raw[0].toUpperCase() : raw[0];
        ctx.font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
        const box = ctx.measureText(ch).actualBoundingBoxLeft;
        const size = parseFloat(cs.fontSize);
        if (!size || !Number.isFinite(box)) return;
        // actualBoundingBoxLeft is negative when the ink sits right of the
        // origin, which is exactly the shift we need to cancel.
        t.style.marginLeft = `${(box / size).toFixed(4)}em`;
      });
    };

    align();
    document.fonts?.ready.then(align);
  }, []);

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
        // Parallax only where the mark is an absolute bleed. On phones it sits
        // in the flow below the copy, and shifting it would drag it back over.
        if (window.matchMedia("(min-width: 721px)").matches) {
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
        <p className="hero-lead" data-hero data-optical>
          {lead}
        </p>
        <h1 className="hero-title" data-hero data-optical>
          {title}
        </h1>
        {tag && (
          <p className="hero-tag" data-hero data-optical>
            {tag}
          </p>
        )}
        {desc && (
          <div className="hero-foot" data-hero>
            <p className="hero-desc" data-optical>
              {desc}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
