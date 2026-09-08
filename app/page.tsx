import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Cred } from "@/components/Cred";
import { FeatureHead } from "@/components/FeatureHead";
import { Reveal } from "@/components/Reveal";
import { PillarIcon } from "@/components/Icons";
import { EntryCards } from "@/components/EntryCards";
import { Principles } from "@/components/Principles";
import { FounderCards } from "@/components/Founders";
import { BookingButton } from "@/components/Booking";
import { Flip } from "@/components/Flip";
import { ValuePoints } from "@/components/ValuePoints";
import { pillars, site, cta } from "@/lib/site";

// The home page is the whole story, not a teaser. Founder feedback (Jul 2026):
// hardly anyone clicks past the first page, so everything that argues for the
// call has to be on it — the pedigree, the pillars, the entry points, the
// approach, the people. Order: Hero → cred band → What we do → How we engage →
// The approach → The founders → CTA. Each section stays a compression of its
// page and links out to the full version.
//
// Claims hierarchy (revised Sep 2026): the hero now leads with the
// positioning itself — "Independent Production Architects." as the headline —
// over the one concrete sentence beneath it (what we do, for whom). The old
// "From fragments, order." headline and its kicker are retired from the hero.
// "Knowledge applied to action" stays in the header lockup as the brand core.
// "Better by design." is the crosshead before "What we do". No two claims
// ever share one breath.
export default function Home() {
  return (
    <>
      <Hero
        variant="home"
        title={
          <>
            Independent
            <br />
            Production
            <br />
            <em>Architects.</em>
          </>
        }
        desc={site.sub}
      />

      <Cred />

      {/* How we create value — asymmetric on purpose: big heading left, a
          stepped interactive list right (1 top, 2 middle, 3 bottom). The row
          interaction is deliberately not a flip. */}
      <section className="feature">
        <div className="wrap">
          <div className="g12 vgrid">
            <div className="vhead">
              <h2 className="vbig">
                How we create <em>value</em>
              </h2>
              <p className="vsub">
                Getting more from your production budget takes more than cutting
                costs.
              </p>
            </div>
            <ValuePoints />
          </div>
        </div>
      </section>

      {/* What we do — mirror of the value section: the four pillars stacked on
          the left, the heading + deck sticky on the right. Cards are creme (not
          ink) and flip to rust. Explore deep-links to the matching service,
          pre-expanded. */}
      <section className="feature">
        <div className="wrap">
          <div className="g12 wgrid">
            <div className="whead">
              <h2 className="vbig">
                What we <em>do</em>
              </h2>
              <p className="vsub">
                Four pillars, one partner: strategy, organisation, AI and cost,
                held to a single independent standard.
              </p>
              <Link href="/services#services" className="whead-link">
                All services →
              </Link>
            </div>
            <Reveal className="wcards" stagger>
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
                    </>
                  }
                  back={
                    <>
                      <p className="p-lead">{p.homeLead}</p>
                      <Link href={`/services#${p.slug}`} className="explore">
                        Explore →
                      </Link>
                    </>
                  }
                />
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* How we engage — same treatment as What we do: heading + deck + link
          sticky on the left, the three entry cards stacked on the right. */}
      <section className="feature">
        <div className="wrap">
          <div className="g12 wgrid">
            <div className="whead">
              <h2 className="vbig">
                How we <em>engage</em>
              </h2>
              <p className="vsub">
                Every relationship starts one of three ways: an audit, a
                workshop or a pilot. Each one: fixed scope, a fee agreed before
                we start, and a recommendation you keep whatever you decide
                next.
              </p>
              <Link href="/services" className="whead-link">
                How engagements work →
              </Link>
            </div>
            <EntryCards layout="stack" />
          </div>
        </div>
      </section>

      {/* The approach, home teaser — divided into How we work + the six
          dimensions. Home shows only How we work, plakativ (the seven
          principles as bold labels); the dimensions live on /approach. */}
      <section className="feature">
        <div className="wrap">
          <FeatureHead
            caps
            title={
              <>
                How we <em>work</em>
              </>
            }
            deck="Most production problems are operational. The Approach frames every engagement: an audit scores across all six dimensions, a workshop or pilot goes deep on the one or two that matter most."
          />
          <div className="g12">
            <Principles plakativ />
          </div>
          <div className="caption">
            <Link href="/approach" className="clink" style={{ marginLeft: "auto" }}>
              The full approach →
            </Link>
          </div>
        </div>
      </section>

      {/* The founders — full-width so the portraits stay big and centred (they
          are the proof); caps heading like the rest. */}
      <section className="feature">
        <div className="wrap">
          <FeatureHead
            caps
            title={
              <>
                The <em>founders</em>
              </>
            }
            deck="The people you would actually work with. Studios founded, departments built, budgets carried."
          />
          <div className="g12">
            <FounderCards />
          </div>
          <div className="caption">
            <Link href="/team" className="clink" style={{ marginLeft: "auto" }}>
              Meet the team →
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
