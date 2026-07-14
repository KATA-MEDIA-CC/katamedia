import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { FeatureHead } from "@/components/FeatureHead";
import { Reveal } from "@/components/Reveal";
import { founders, site, pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Talk to Kata. Independent production advisory — now booking 2026. A 45 minute call, and an honest read within 24 hours.",
  path: "/contact",
});

type Frame = {
  no: string;
  name: string;
  label: string;
  value: string;
  href?: string;
};

// The contact sheet — every way in, one frame each.
const frames: Frame[] = [
  ...founders.map((f, i) => ({
    no: String(i + 1).padStart(2, "0"),
    name: f.name,
    label: f.role,
    value: f.email,
    href: `mailto:${f.email}`,
  })),
  {
    no: "04",
    name: "The call",
    label: "45 minutes",
    value: "An honest read, back within 24 hours",
  },
  {
    no: "05",
    name: "Online",
    label: "Web",
    value: site.domain,
  },
  {
    no: "06",
    name: "Booking",
    label: "Availability",
    value: site.booking,
  },
];

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
        desc="Independent by design. On your side by choice. Tell us what you are trying to figure out — no deck, no pitch."
      />

      {/* The contact sheet */}
      <section className="feature">
        <div className="wrap">
          <FeatureHead
            no="01"
            title={
              <>
                The contact <em>sheet</em>
              </>
            }
            deck="Every way in, one frame each. Reach any of us directly — you will get a person, not a form."
          />
          <div className="g12">
            <Reveal className="csheet" stagger>
              {frames.map((f) => {
                const inner = (
                  <>
                    <span className="cf-no">{f.no}</span>
                    <span className="cf-body">
                      <span className="cf-nm">{f.name}</span>
                      <span className="cf-ro">{f.label}</span>
                      <span className="cf-v">{f.value}</span>
                    </span>
                  </>
                );
                return f.href ? (
                  <a className="cframe" href={f.href} key={f.no}>
                    {inner}
                  </a>
                ) : (
                  <div className="cframe" key={f.no}>
                    {inner}
                  </div>
                );
              })}
            </Reveal>
          </div>
          <div className="caption">
            <span>Contact sheet · six frames</span>
            <span className="r">Frames 01–03 are live — click to write</span>
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
              beyond. We&rsquo;re booking engagements for 2026 now — an audit, a
              workshop or a pilot first.
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
