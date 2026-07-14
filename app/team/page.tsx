import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { FeatureHead } from "@/components/FeatureHead";
import { Reveal } from "@/components/Reveal";
import { founders, partnerNetwork, site, pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Team",
  description:
    "The people behind Kata — three founding partners who have built, run and controlled productions, plus an extended network of specialists across finance, strategy, AI, creative and production.",
  path: "/team",
});

const initial = (name: string) => name.trim()[0].toUpperCase();

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
            <Reveal className="founders" stagger>
              {founders.map((f) => (
                <div className="founder" key={f.email}>
                  <div className="f-av">
                    <span>{initial(f.name)}</span>
                  </div>
                  <div>
                    <div className="f-nm">{f.name}</div>
                    <div className="f-ro">{f.role}</div>
                  </div>
                  <p className="f-note">{f.note}</p>
                  <a className="f-mail" href={`mailto:${f.email}`}>
                    <span className="d" />
                    {f.email}
                  </a>
                </div>
              ))}
            </Reveal>
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
            deck="Specialists we bring in when the work calls for them — curated, and never on anyone else's payroll."
          />
          <div className="g12">
            <Reveal className="netgrid" stagger>
              {partnerNetwork.map((p) => (
                <div className="netcard" key={p.no}>
                  <div className="nc-top">
                    <span className="nc-no">{p.no}</span>
                    <span className="nc-status">{p.status}</span>
                  </div>
                  <h3>{p.discipline}</h3>
                  <p>{p.body}</p>
                </div>
              ))}
            </Reveal>
          </div>
          <div className="caption">
            <span>Finance · Strategy · AI · Creative · Production</span>
            <span className="r">Partner roles being filled through 2026</span>
          </div>
        </div>
      </section>

    </>
  );
}
