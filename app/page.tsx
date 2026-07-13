import Link from "next/link";
import { Hero } from "@/components/Hero";
import { FeatureHead } from "@/components/FeatureHead";
import { Reveal } from "@/components/Reveal";
import { PillarIcon } from "@/components/Icons";
import { pillars, site } from "@/lib/site";

export default function Home() {
  return (
    <>
      <Hero
        variant="home"
        lead="Independent Production Advisory — for brands & agencies"
        title={
          <>
            Better
            <br />
            <em>decisions.</em>
          </>
        }
        tag={site.tagline}
        desc={site.short}
        pill={site.booking}
      />

      {/* Belief */}
      <section className="statement ink">
        <div className="wrap">
          <Reveal>
            <p className="st-kick">Our conviction</p>
            <p className="st-quote">
              We sit beside the <em>decision</em> — never above the process,
              never inside the margin.
            </p>
          </Reveal>
        </div>
      </section>

      {/* What we do — four pillars, compact */}
      <section className="feature">
        <div className="wrap">
          <FeatureHead
            no="01"
            title={
              <>
                What we <em>do</em>
              </>
            }
            deck="Four pillars, one partner — cost, strategy, organisation and AI, held to a single independent standard."
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
            <span>Controlling · Strategy · Organisation · AI</span>
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
              {site.booking}
            </p>
            <p className="cta-line">
              The first conversation is the <em>front door.</em>
            </p>
            <Link href="/contact" className="btn solid">
              <span className="dot" />
              Start a conversation
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
