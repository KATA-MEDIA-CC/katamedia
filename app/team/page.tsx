import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { FeatureHead } from "@/components/FeatureHead";
import { Founders } from "@/components/Founders";
import { Network } from "@/components/Network";
import { BookingButton } from "@/components/Booking";
import { Reveal } from "@/components/Reveal";
import { cta, pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Team",
  description:
    "The people behind Kata. Three founding partners who have built, run and controlled productions, plus a network of specialists across finance, strategy, technology, AI, creative, production, HR, venture, media, talent partnerships, legal and sustainability.",
  path: "/team",
});

export default function TeamPage() {
  return (
    <>
      <Hero
        variant="page"
        lead="Who we are"
        title={
          <>
            <em>Team</em>
          </>
        }
      />

      {/* The founders */}
      <section className="feature">
        <div className="wrap">
          <FeatureHead
            title={
              <>
                The <em>founders</em>
              </>
            }
            deck="Built by people who ran the companies that make this work. Studios founded, departments built, budgets carried. The strategy is never theoretical."
          />
          <div className="g12">
            <Founders />
          </div>
        </div>
      </section>

      {/* Extended partner network */}
      <section className="feature">
        <div className="wrap">
          <FeatureHead
            title={
              <>
                The <em>network</em>
              </>
            }
            deck="Specialists we bring in when the work calls for them. Open a sector to see who that is."
          />
          <div className="g12">
            <Network />
          </div>
        </div>
      </section>

      {/* Closing CTA, the same band Home, Services and Approach end on */}
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
