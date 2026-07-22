import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Cred } from "@/components/Cred";
import { FeatureHead } from "@/components/FeatureHead";
import { Reveal } from "@/components/Reveal";
import { PillarIcon, DimensionIcon } from "@/components/Icons";
import { FounderCards } from "@/components/Founders";
import { BookingButton } from "@/components/Booking";
import { pillars, entryPoints, dimensions, site, cta } from "@/lib/site";

// The home page is the whole story, not a teaser. Founder feedback (Jul 2026):
// hardly anyone clicks past the first page, so everything that argues for the
// call has to be on it — the pedigree, the pillars, the entry points, the
// method, the people. Order: Hero → cred band → What we do → How we engage →
// The method → The founders → CTA. Each section stays a compression of its
// page and links out to the full version.
//
// Claims hierarchy (settled with all three founders, round 2, Jul 2026):
// "Knowledge applied to action" stays in the header lockup as the brand core.
// "From fragments — order." is the hero headline, with one concrete sentence
// under it (audience · offer · credibility). "Better by design." moved out of
// the hero and sits as the crosshead before "What we do". No two claims ever
// share one breath.
export default function Home() {
  return (
    <>
      <Hero
        variant="home"
        lead={site.descriptor}
        title={
          <>
            From fragments,
            <br />
            <em>order.</em>
          </>
        }
        desc={site.sub}
      />

      <Cred />

      {/* What we do — four pillars, compact.
          Sits directly under the cred band on purpose: what we sell has to be
          the first thing after who we are. */}
      <section className="feature">
        <div className="wrap">
          <FeatureHead
            kick="Better by design."
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
                <div className="pillar" key={p.title}>
                  <div className="pillar-top">
                    <span className="pillar-ico">
                      <PillarIcon name={p.icon} />
                    </span>
                  </div>
                  <h3>{p.title}</h3>
                  <p className="p-lead">{p.homeLead}</p>
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

      {/* How we engage — the three entry points, compressed from /services.
          Answers the first questions any visitor has: how do I start, how
          long does it take, what does it cost me to find out. */}
      <section className="feature">
        <div className="wrap">
          <FeatureHead
            title={
              <>
                How we <em>engage</em>
              </>
            }
            deck="Every relationship starts one of three ways: fixed scope, fixed fee, and a recommendation you keep whatever you decide next."
          />
          <div className="g12">
            <Reveal className="trio" stagger>
              {entryPoints.map((d) => (
                <div className="card" key={d.title}>
                  <h3>{d.title}</h3>
                  <span className="c-meta">{d.meta}</span>
                  <p className="c-spacer">{d.body}</p>
                </div>
              ))}
            </Reveal>
          </div>
          <div className="caption">
            <span>No retainer required to start</span>
            <Link href="/services" className="clink">
              How engagements work →
            </Link>
          </div>
        </div>
      </section>

      {/* The method — six dimensions as icon + label only. The full bodies
          live on /approach; here the grid just proves the IP exists. */}
      <section className="feature">
        <div className="wrap">
          <FeatureHead
            title={
              <>
                The <em>method</em>
              </>
            }
            deck="Most production problems are operational, not creative. Every audit is scored across six dimensions, and one roadmap comes out."
          />
          <div className="g12">
            <Reveal className="dims" stagger>
              {dimensions.map((d) => (
                <div className="dim" key={d.title}>
                  <span className="dim-ico">
                    <DimensionIcon name={d.icon} />
                  </span>
                  <span className="dim-t">{d.title}</span>
                </div>
              ))}
            </Reveal>
          </div>
          <div className="caption">
            <span>Diagnostic · Roadmap · Recommendation · yours to keep</span>
            <Link href="/approach" className="clink">
              The full method →
            </Link>
          </div>
        </div>
      </section>

      {/* The founders — photo, name, one line. The full bios are on /team. */}
      <section className="feature">
        <div className="wrap">
          <FeatureHead
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
            <span>Three founding partners · one independent standard</span>
            <Link href="/team" className="clink">
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
