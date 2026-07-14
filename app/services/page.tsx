import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { BookingButton } from "@/components/Booking";
import { FeatureHead } from "@/components/FeatureHead";
import { Reveal } from "@/components/Reveal";
import { PillarIcon } from "@/components/Icons";
import { pillars, entryPoints, site, cta, pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Services",
  description:
    "How we engage — an audit, a workshop or a pilot, fixed fee. Then four pillars: strategic advisory, organisational setup and studio builds, AI integration, and production controlling.",
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
            The <em>services</em>
          </>
        }
        tag={site.tagline}
      />

      {/* How we engage — the way a relationship starts */}
      <section className="feature">
        <div className="wrap">
          <FeatureHead
            no="01"
            title={
              <>
                How we <em>engage</em>
              </>
            }
            deck="Every relationship starts one of three ways — fixed scope, fixed fee, and a recommendation you keep whatever you decide next."
          />
          <div className="g12">
            <Reveal className="trio" stagger>
              {entryPoints.map((d) => (
                <div className="card" key={d.no}>
                  <span className="c-no">{d.no}</span>
                  <h3>{d.title}</h3>
                  <span className="c-meta">{d.meta}</span>
                  <p className="c-spacer">{d.body}</p>
                </div>
              ))}
            </Reveal>
          </div>
          <div className="caption">
            <span>Each one ends in a written recommendation — yours to keep.</span>
            <span className="r">No retainer required to start</span>
          </div>
        </div>
      </section>

      {/* Four pillars — the work itself */}
      <section className="feature">
        <div className="wrap">
          <FeatureHead
            no="02"
            title={
              <>
                Four <em>pillars</em>
              </>
            }
            deck="Where the work goes from there — one partner across cost, strategy, organisation and AI, held to a single independent standard."
          />
          <div className="g12">
            <Reveal className="pillars">
              {pillars.map((p) => (
                <div className="pillar" key={p.no}>
                  <div className="pillar-top">
                    <span className="pillar-no">{p.no}</span>
                    <span className="pillar-ico">
                      <PillarIcon name={p.icon} />
                    </span>
                  </div>
                  <h3>{p.title}</h3>
                  <p className="p-lead">{p.lead}</p>
                  <ul>
                    {p.items.slice(0, 3).map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                </div>
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
