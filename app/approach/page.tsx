import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { FeatureHead } from "@/components/FeatureHead";
import { Reveal } from "@/components/Reveal";
import { dimensions, cta, pageMetadata } from "@/lib/site";
import { BookingButton } from "@/components/Booking";

export const metadata: Metadata = pageMetadata({
  title: "Approach",
  description:
    "How Kata works. Independent judgement applied in time. The Kata Method: six dimensions, one roadmap. And four ways to engage.",
  path: "/approach",
});

export default function ApproachPage() {
  return (
    <>
      <Hero
        variant="page"
        lead="The Method"
        title={
          <>
            The <em>approach</em>
          </>
        }
        tag="Six dimensions. One roadmap."
      />

      {/* Belief */}
      <section className="statement">
        <div className="wrap">
          <Reveal>
            <p className="st-kick">The belief</p>
            <p className="st-quote">
              Independent judgement, applied in <em>time.</em>
            </p>
            <p className="st-sub">
              Most production advice comes from people with a financial stake in
              the outcome. We don&rsquo;t. We sit beside the decision, never
              above the process and never inside the margin. Every
              recommendation is grounded in what actually happens on set, in the
              edit, and in the negotiation.
            </p>
          </Reveal>
        </div>
      </section>

      {/* The Method — six dimensions */}
      <section className="feature">
        <div className="wrap">
          <FeatureHead
            title={
              <>
                The <em>method</em>
              </>
            }
            deck="Most production problems are operational, not creative. Six dimensions are how we diagnose them, and build one clear roadmap."
          />
          <div className="g12">
            <Reveal className="trio" stagger>
              {dimensions.map((d) => (
                <div className="card" key={d.title}>
                  <h3>{d.title}</h3>
                  <p className="c-spacer">{d.body}</p>
                </div>
              ))}
            </Reveal>
          </div>
          <div className="caption">
            <span>Diagnostic · Roadmap · Recommendation · yours to keep</span>
            <span className="r">RAG-scored across all six dimensions</span>
          </div>
        </div>
      </section>

      {/* Difference — closing ink */}
      <section className="statement ink">
        <div className="wrap">
          <Reveal>
            <p className="st-kick">Our difference</p>
            <p className="st-quote">
              We have no relationships to <em>protect.</em>
            </p>
            <p className="st-sub">
              Not a production company. Not an agency. No financial ties to the
              directors or production companies we recommend, so our advice is
              only ever in the client&rsquo;s interest.
            </p>
            <p className="st-sub">
              Nobody knows the German market like we do. Rates, rosters,
              directors, production companies. From the inside.
            </p>
          </Reveal>
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
              A 45 minute call. We will come back within 24 hours with an honest
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
