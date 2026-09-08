import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { BookingButton } from "@/components/Booking";
import { FeatureHead } from "@/components/FeatureHead";
import { Reveal } from "@/components/Reveal";
import { EntryCards } from "@/components/EntryCards";
import { ServicesAccordion } from "@/components/ServicesAccordion";
import { cta, pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Services",
  description:
    "How we engage. An audit, a workshop or a pilot, with a fee agreed before we start. Then four pillars: strategic advisory, organisational setup and studio builds, AI integration, and production controlling.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <Hero
        variant="page"
        lead="What we do"
        title={
          <>
            <em>Services</em>
          </>
        }
        desc="One partner across strategy, organisation, AI and cost."
      />

      {/* How we engage — the way a relationship starts */}
      <section className="feature">
        <div className="wrap">
          <FeatureHead
            title={
              <>
                How we <em>engage</em>
              </>
            }
            deck="Every engagement starts one of three ways: an audit, a workshop or a pilot. Each one: fixed scope, a fee agreed before we start, and a recommendation you keep whatever you decide next."
          />
          <div className="g12">
            <EntryCards />
          </div>
        </div>
      </section>

      {/* Four pillars — the work itself. id="services" is the jump target for
          the home "All services →" link: it is not a pillar slug, so the
          accordion scrolls into view collapsed rather than pre-expanded. */}
      <section className="feature" id="services">
        <div className="wrap">
          <FeatureHead
            title={
              <>
                Our <em>services</em>
              </>
            }
            deck="Where the work goes from there. One partner across strategy, organisation, AI and cost."
          />
          <div className="g12">
            <ServicesAccordion />
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="feature cta-band">
        <div className="wrap">
          <Reveal className="cta-inner">
            <p className="st-kick" style={{ color: "var(--clay-d)" }}>
              Next step
            </p>
            <p className="cta-line">
              Not sure where you would <em>start?</em>
            </p>
            <p className="cta-body">That is what the call is for.</p>
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
