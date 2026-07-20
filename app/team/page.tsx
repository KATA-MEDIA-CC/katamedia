import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { FeatureHead } from "@/components/FeatureHead";
import { Founders } from "@/components/Founders";
import { Network } from "@/components/Network";
import { site, pageMetadata } from "@/lib/site";

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
            The <em>team</em>
          </>
        }
        tag={site.tagline}
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

    </>
  );
}
