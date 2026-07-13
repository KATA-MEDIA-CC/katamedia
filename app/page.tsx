import Link from "next/link";
import { Hero } from "@/components/Hero";
import { FeatureHead } from "@/components/FeatureHead";
import { Reveal } from "@/components/Reveal";
import { PillarIcon } from "@/components/Icons";
import { pillars, frontDoors, site } from "@/lib/site";

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

      {/* What we do — four pillars */}
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
                    {p.items.slice(0, 4).map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
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

      {/* Belief */}
      <section className="statement ink">
        <div className="wrap">
          <Reveal>
            <p className="st-kick">Our conviction</p>
            <p className="st-quote">
              We sit beside the <em>decision</em> — never above the process,
              never inside the margin.
            </p>
            <p className="st-sub">
              Brands are the only party in the brand–agency–production triangle
              with no one independently in their corner. That is the gap Kata
              exists to close.
            </p>
          </Reveal>
          <Reveal
            className="metrics"
            stagger
            style={{ marginTop: "clamp(48px,6vw,88px)" }}
          >
            <div className="metric">
              <div className="v">0</div>
              <div className="l">
                Vendor ties — no financial stake in what we recommend
              </div>
            </div>
            <div className="metric">
              <div className="v">4</div>
              <div className="l">
                Pillars — controlling, strategy, organisation, AI
              </div>
            </div>
            <div className="metric">
              <div className="v">3</div>
              <div className="l">
                Front doors — audit, workshop or pilot, fixed fee
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* How to start */}
      <section className="feature">
        <div className="wrap">
          <FeatureHead
            no="02"
            title={
              <>
                How to <em>start</em>
              </>
            }
            deck="Every engagement starts with one of three low-commitment entry points — fixed scope, fixed fee, real output you keep."
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
          <div
            className="g12"
            style={{ marginTop: "clamp(40px,5vw,64px)" }}
          >
            <div style={{ gridColumn: "1 / 13" }}>
              <Reveal>
                <Link href="/contact" className="btn solid">
                  <span className="dot" />
                  Start a conversation
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
