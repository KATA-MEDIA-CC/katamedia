import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { FeatureHead } from "@/components/FeatureHead";
import { Founders } from "@/components/Founders";
import { Network } from "@/components/Network";
import { site, pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Team",
  description:
    "The people behind Kata — three founding partners who have built, run and controlled productions, plus an extended network of specialists across finance, strategy, AI, creative and production.",
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
            no="01"
            title={
              <>
                The <em>founders</em>
              </>
            }
            deck="Built by people who have done this work — on set, in the edit, and in the negotiation. Between us, decades of hands-on production."
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
            no="02"
            title={
              <>
                The extended <em>network</em>
              </>
            }
            deck="Specialists we bring in when the work calls for them — curated, and never on anyone else's payroll. Open a sector to see who that is."
          />
          <div className="g12">
            <Network />
          </div>
          <div className="caption">
            <span>Nine sectors · more than one specialist behind each</span>
          </div>
        </div>
      </section>

    </>
  );
}
