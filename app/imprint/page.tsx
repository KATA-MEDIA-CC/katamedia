import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { site, pageMetadata } from "@/lib/site";

// ⚠️ DRAFT — legally required page (§ 5 DDG), scaffolded from CR feedback
// (Jul 2026). Every [BRACKETED] value below is a PLACEHOLDER Justin must
// fill with the real company data, and the draft notice must be removed
// before this page can be considered compliant. Have it checked by a lawyer.
// Impressum content is kept in German on purpose — that is the audience of
// the legal obligation.
export const metadata: Metadata = pageMetadata({
  title: "Impressum",
  description: "Impressum der Kata Media Consultancy GmbH.",
  path: "/imprint",
});

export default function ImprintPage() {
  return (
    <>
      <Hero
        variant="page"
        lead="Rechtliches"
        title={
          <>
            <em>Impressum</em>
          </>
        }
      />
      <section className="feature">
        <div className="wrap">
          <div className="g12">
            <div className="legal">
              <p className="legal-draft">
                Entwurf — Platzhalter in eckigen Klammern müssen mit den echten
                Firmendaten gefüllt und dieser Hinweis entfernt werden, bevor
                die Seite gilt. Vor Veröffentlichung juristisch prüfen lassen.
              </p>

              <h2>Angaben gemäß § 5 DDG</h2>
              <p>
                Kata Media Consultancy GmbH
                <br />
                [Straße und Hausnummer]
                <br />
                [PLZ Ort]
              </p>

              <h2>Vertreten durch</h2>
              <p>[Geschäftsführer: Vor- und Nachnamen]</p>

              <h2>Kontakt</h2>
              <p>
                E-Mail: <a href={`mailto:${site.email}`}>{site.email}</a>
              </p>

              <h2>Registereintrag</h2>
              <p>
                Eintragung im Handelsregister.
                <br />
                Registergericht: Amtsgericht [Ort]
                <br />
                Registernummer: HRB [Nummer]
              </p>

              <h2>Umsatzsteuer-ID</h2>
              <p>
                Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG:
                <br />
                [DE000000000]
              </p>

              <h2>Verantwortlich im Sinne von § 18 Abs. 2 MStV</h2>
              <p>[Name, Anschrift wie oben]</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
