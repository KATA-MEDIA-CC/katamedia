import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { BookingButton } from "@/components/Booking";
import { FeatureHead } from "@/components/FeatureHead";
import { Reveal } from "@/components/Reveal";
import { PillarIcon } from "@/components/Icons";
import { Flip } from "@/components/Flip";
import { EntryCards } from "@/components/EntryCards";
import { pillars, cta, pageMetadata, flipBack } from "@/lib/site";

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
            deck="Every relationship starts one of three ways: an audit, a workshop or a pilot. Each one: fixed scope, a fee agreed before we start, and a recommendation you keep whatever you decide next."
          />
          <div className="g12">
            <EntryCards />
          </div>
        </div>
      </section>

      {/* Four pillars — the work itself */}
      <section className="feature">
        <div className="wrap">
          <FeatureHead
            title={
              <>
                Four <em>pillars</em>
              </>
            }
            deck="Where the work goes from there. One partner across strategy, organisation, AI and cost, held to a single independent standard."
          />
          <div className="g12">
            <Reveal className="pillars">
              {pillars.map((p) => (
                <Flip
                  className="pillar"
                  key={p.title}
                  front={
                    <>
                      <span className="pillar-ico">
                        <PillarIcon name={p.icon} />
                      </span>
                      <h3 className="p-title">{p.title}</h3>
                      <p className="p-lead">{p.lead}</p>
                    </>
                  }
                  back={<p className="flip-b">{flipBack}</p>}
                />
              ))}
            </Reveal>
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
