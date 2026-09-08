import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { FeatureHead } from "@/components/FeatureHead";
import { Reveal } from "@/components/Reveal";
import { DimensionList } from "@/components/DimensionList";
import { Principles } from "@/components/Principles";
import { cta, pageMetadata } from "@/lib/site";
import { BookingButton } from "@/components/Booking";

export const metadata: Metadata = pageMetadata({
  title: "Approach",
  description:
    "How Kata works. Independent judgement applied in time. The Kata Approach: six dimensions, one roadmap. And four ways to engage.",
  path: "/approach",
});

export default function ApproachPage() {
  return (
    <>
      <Hero
        variant="page"
        lead="How we work"
        title={
          <>
            <em>Approach</em>
          </>
        }
        desc="Most production problems are operational, not creative. Six dimensions, one honest roadmap."
      />

      {/* Belief — same head + deck treatment as every other section */}
      <section className="feature">
        <div className="wrap">
          <FeatureHead
            caps
            kick="The belief"
            title={
              <>
                Independent judgement. On your <em>side.</em>
              </>
            }
            deck="Production advice usually comes from someone with a financial stake in the outcome. We sit beside the decision, never above the process and never inside the margin. Every recommendation is grounded in systems we have designed and built ourselves."
          />
        </div>
      </section>

      {/* How we work — the seven principles. A titled section like every other
          (the umbrella "The approach" head is dropped: the hero + belief already
          frame the page, and the two named parts carry it). */}
      <section className="feature">
        <div className="wrap">
          <FeatureHead
            caps
            title={
              <>
                How we <em>work</em>
              </>
            }
            deck="The posture we bring to every engagement, before a single number."
          />
          <div className="g12">
            <Principles />
          </div>
        </div>
      </section>

      {/* The Kata Architecture Index — the six dimensions the audit scores */}
      <section className="feature">
        <div className="wrap">
          <FeatureHead
            caps
            title={
              <>
                The Kata Architecture <em>Index</em>
              </>
            }
            deck="Most production problems are operational. Every engagement is scored across all six dimensions; a workshop or pilot goes deep on the one or two that matter most."
          />
          <div className="g12">
            <DimensionList />
          </div>

          {/* The name — moved back here (Sep 2026): it frames the approach
              better than it sat on the team page. */}
          <div className="g12">
            <Reveal className="origin">
              <p className="origin-kick">The name</p>
              <p className="origin-line">
                <b>Kata</b> — Japanese for <em>form</em>. A sequence of
                movements, internalised through repetition, until it holds in
                any situation.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Closing CTA, the same band Home and Services end on */}
      <section className="feature cta-band">
        <div className="wrap">
          <Reveal className="cta-inner">
            <p className="st-kick" style={{ color: "var(--clay-d)" }}>
              — Start with a conversation —
            </p>
            <p className="cta-line">
              Tell us what you are trying to <em>figure out.</em>
            </p>
            <p className="cta-body">
              A 45-minute call. We will come back within 24 hours with an honest
              read on whether we are the right people to help, and which founder
              you would be working with.
            </p>
            <BookingButton className="btn solid">
              <span className="dot" />
              {cta.label}
            </BookingButton>
          </Reveal>
        </div>
      </section>
    </>
  );
}
