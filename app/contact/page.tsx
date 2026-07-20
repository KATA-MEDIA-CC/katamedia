import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { FeatureHead } from "@/components/FeatureHead";
import { Reveal } from "@/components/Reveal";
import { ContactForm } from "@/components/ContactForm";
import { founders, site, pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Talk to Kata. Independent production advisory, now booking 2026. A 45 minute call, and an honest read within 24 hours.",
  path: "/contact",
});

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
        desc="Tell us what you are trying to figure out. No deck, no pitch."
      />

      {/* The form */}
      <section className="feature">
        <div className="wrap">
          <FeatureHead
            title={
              <>
                Start a <em>conversation</em>
              </>
            }
            deck="Tell us what you are trying to figure out. You will get a person, not a form response."
          />
          <div className="g12">
            <Reveal className="form-col">
              <ContactForm />
            </Reveal>
            <Reveal className="form-side">
              <p className="fs-k">What happens next</p>
              <ul className="fs-list">
                <li>
                  <span className="n">01</span>A 45 minute call, at a time that
                  suits you.
                </li>
                <li>
                  <span className="n">02</span>An honest read within 24 hours on
                  whether we are the right people to help.
                </li>
                <li>
                  <span className="n">03</span>Which founder you would be working
                  with, and what a first engagement looks like.
                </li>
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Individual contacts */}
      <section className="feature">
        <div className="wrap">
          <FeatureHead
            title={
              <>
                Individual <em>contacts</em>
              </>
            }
            deck="Or skip the form and write to one of us directly."
          />
          <div className="g12">
            <Reveal className="csheet" stagger>
              {founders.map((f, i) => (
                <a className="cframe" href={`mailto:${f.email}`} key={f.email}>
                  <span className="cf-no">{String(i + 1).padStart(2, "0")}</span>
                  <span className="cf-body">
                    <span className="cf-nm">{f.name}</span>
                    <span className="cf-ro">{f.role}</span>
                    <span className="cf-v">{f.email}</span>
                  </span>
                </a>
              ))}
            </Reveal>
          </div>
          <div className="caption">
            <span>{site.domain}</span>
            <span className="r">{site.booking}</span>
          </div>
        </div>
      </section>
    </>
  );
}
