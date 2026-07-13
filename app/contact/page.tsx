import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { FeatureHead } from "@/components/FeatureHead";
import { Reveal } from "@/components/Reveal";
import { founders, site, pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Talk to Kata. Independent production advisory for brands and agencies — now booking 2026. Reach the founding partners directly.",
  path: "/contact",
});

const initial = (name: string) => name.trim()[0].toUpperCase();

export default function ContactPage() {
  return (
    <>
      <Hero
        variant="page"
        lead={`Contact · ${site.booking}`}
        title={
          <>
            Let&rsquo;s <em>talk.</em>
          </>
        }
        tag={site.tagline}
        desc="Independent by design. On your side by choice. The first conversation is the front door — no deck, no pitch."
      />

      {/* Founders */}
      <section className="feature">
        <div className="wrap">
          <FeatureHead
            no="01"
            title={
              <>
                The <em>partners</em>
              </>
            }
            deck="Built by people who have done this work — from cost control to creative delivery. Reach any of us directly."
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

      {/* Closing */}
      <section className="statement ink">
        <div className="wrap">
          <Reveal>
            <p className="st-kick">Independent · By design</p>
            <p className="st-quote">
              On your side by <em>choice.</em>
            </p>
            <p className="st-sub">
              Kata is a media consultancy for the German-speaking market and
              beyond. We&rsquo;re booking engagements for 2026 now — audits,
              workshops and pilots first.
            </p>
          </Reveal>
          <div className="g12">
            <Reveal className="contact-cols" stagger>
              <div>
                <p className="cc-k">General enquiries</p>
                <a className="cc-v" href={`mailto:${founders[0].email}`}>
                  {founders[0].email}
                </a>
              </div>
              <div>
                <p className="cc-k">Online</p>
                <p className="cc-v">{site.domain}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
