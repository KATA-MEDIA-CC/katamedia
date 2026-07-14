import Link from "next/link";
import { Hero } from "@/components/Hero";
import { FeatureHead } from "@/components/FeatureHead";
import { Reveal } from "@/components/Reveal";
import { PillarIcon } from "@/components/Icons";
import { BookingButton } from "@/components/Booking";
import { pillars, site, cta } from "@/lib/site";

export default function Home() {
  return (
    <>
      <Hero
        variant="home"
        lead={site.descriptor}
        title={
          <>
            Better
            <br />
            <em>by design.</em>
          </>
        }
        tag={site.tagline}
        desc={site.short}
      />

      {/* What we do — four pillars, compact.
          Sits directly under the hero on purpose: what we sell has to be the
          first thing after the name, not the third. The conviction band that
          used to live here said "never inside the margin" — the same sentence,
          verbatim, that /approach already carries in its belief statement. It
          was repetition, and it pushed the pillars below two screens of
          abstraction. */}
      <section className="feature">
        <div className="wrap">
          <FeatureHead
            no="01"
            title={
              <>
                What we <em>do</em>
              </>
            }
            deck="Four pillars, one partner: strategy, organisation, AI and cost, held to a single independent standard."
          />
          <div className="g12">
            <Reveal className="pillars min">
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
                </div>
              ))}
            </Reveal>
          </div>
          <div className="caption">
            <span>Strategy · Organisation · AI · Controlling</span>
            <Link href="/services" className="clink">
              All services →
            </Link>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
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
