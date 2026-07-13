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

const clients = [
  {
    kicker: "For brands",
    title: "Brands",
    items: [
      "Direct advisory — working straight with production companies",
      "Independent oversight on agency-managed productions",
      "Insourcing brands building an internal function",
      "Global brands defining a European production strategy",
    ],
  },
  {
    kicker: "For agencies",
    title: "Agencies",
    items: [
      "Network agencies building production functions",
      "Mid-sized agencies fixing under-performing departments",
      "Small agencies creating a function from zero",
      "Agencies building credentials to win production pools",
    ],
  },
];

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
                    {p.items.map((it) => (
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

      {/* Who we work with */}
      <section className="feature">
        <div className="wrap">
          <FeatureHead
            no="03"
            title={
              <>
                Who we <em>work with</em>
              </>
            }
            deck="Brands and agencies. We do not take production companies as advisory clients — our independence depends on it."
          />
          <div className="g12">
            <Reveal className="quad" stagger>
              {clients.map((c) => (
                <div className="card" key={c.title}>
                  <span className="c-kick">{c.kicker}</span>
                  <h3>{c.title}</h3>
                  <ul
                    className="c-spacer"
                    style={{
                      listStyle: "none",
                      margin: 0,
                      padding: 0,
                      display: "flex",
                      flexDirection: "column",
                      gap: 10,
                    }}
                  >
                    {c.items.map((it) => (
                      <li
                        key={it}
                        style={{
                          fontFamily: "var(--serif)",
                          fontSize: "clamp(13.5px,1.25vw,15.5px)",
                          lineHeight: 1.5,
                          color: "var(--ink-80)",
                          display: "flex",
                          gap: 12,
                          alignItems: "baseline",
                          borderTop: "1px solid var(--hair)",
                          paddingTop: 10,
                        }}
                      >
                        <span
                          style={{
                            width: 6,
                            height: 6,
                            background: "var(--clay)",
                            flex: "none",
                            transform: "translateY(4px)",
                          }}
                        />
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </Reveal>
          </div>
          <div style={{ marginTop: "clamp(40px,5vw,64px)" }}>
            <Reveal>
              <Link href="/contact" className="btn solid">
                <span className="dot" />
                Start a conversation
              </Link>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
