import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { FeatureHead } from "@/components/FeatureHead";
import { Reveal } from "@/components/Reveal";
import { PillarIcon } from "@/components/Icons";
import { pillars, frontDoors, site, pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Services",
  description:
    "Four pillars — production controlling, strategic advisory, organisational setup and studio builds, and AI integration. Three fixed-fee front doors to begin.",
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

      {/* Four pillars — full */}
      <section className="feature">
        <div className="wrap">
          <FeatureHead
            no="01"
            title={
              <>
                Four <em>pillars</em>
              </>
            }
            deck="One partner across cost, strategy, organisation and AI — held to a single independent standard."
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

      {/* The Kata Platform */}
      <section className="statement ink">
        <div className="wrap">
          <Reveal>
            <p className="st-kick">The Kata Platform</p>
            <p className="st-quote">
              Your production, visible in <em>real time.</em>
            </p>
            <p className="st-sub">
              Our AI-driven client portal. Every production, every budget, every
              milestone — one place. Live budget dashboards, milestone and
              approval tracking, and automated buyout compliance across markets.
            </p>
          </Reveal>
          <Reveal
            className="metrics"
            stagger
            style={{ marginTop: "clamp(48px,6vw,88px)" }}
          >
            <div className="metric">
              <div className="v">
                100<em>%</em>
              </div>
              <div className="l">Production visibility — actuals vs. estimates, live</div>
            </div>
            <div className="metric">
              <div className="v">AI</div>
              <div className="l">Cost-alert &amp; anomaly detection across productions</div>
            </div>
            <div className="metric">
              <div className="v">Real-time</div>
              <div className="l">Buyout &amp; rights compliance across markets and media</div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Front doors */}
      <section className="feature">
        <div className="wrap">
          <FeatureHead
            no="02"
            title={
              <>
                Three front <em>doors</em>
              </>
            }
            deck="Low-commitment entry points — fixed scope, fixed fee, and a recommendation you keep whatever you decide next."
          />
          <div className="g12">
            <Reveal className="trio" stagger>
              {frontDoors.map((d) => (
                <div className="card" key={d.no}>
                  <span className="c-no">{d.no}</span>
                  <h3>{d.title}</h3>
                  <span className="c-meta">{d.meta}</span>
                  <p className="c-spacer">{d.body}</p>
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
              Brands &amp; agencies only
            </p>
            <p className="cta-line">
              We work entirely on <em>your side.</em>
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
