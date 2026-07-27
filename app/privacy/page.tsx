import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { site, pageMetadata } from "@/lib/site";

// ⚠️ DRAFT — Datenschutzerklärung, scaffolded from CR feedback (Jul 2026).
// Tailored to what this site ACTUALLY does: Vercel hosting, self-hosted
// fonts, no cookies, no analytics, contact form → Attio (CRM) + Resend
// (mail). [BRACKETED] values are placeholders; remove the draft notice and
// have a lawyer review before treating this as compliant.
export const metadata: Metadata = pageMetadata({
  title: "Datenschutz",
  description: "Datenschutzerklärung der Kata Media Consultancy GmbH.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <Hero
        variant="page"
        lead="Rechtliches"
        title={
          <>
            <em>Datenschutz</em>
          </>
        }
      />
      <section className="feature">
        <div className="wrap">
          <div className="g12">
            <div className="legal">
              <p className="legal-draft">
                Entwurf — Platzhalter füllen, Hinweis entfernen, juristisch
                prüfen lassen.
              </p>

              <h2>Verantwortlicher</h2>
              <p>
                Kata Media Consultancy GmbH · [Straße und Hausnummer] · [PLZ
                Ort] · <a href={`mailto:${site.email}`}>{site.email}</a>
              </p>

              <h2>Grundsatz</h2>
              <p>
                Diese Website setzt keine Cookies, verwendet keine Analyse- oder
                Tracking-Dienste und bindet keine Schriften oder Skripte von
                Drittservern ein — die Schriften werden lokal ausgeliefert. Es
                werden nur die Daten verarbeitet, die technisch nötig sind oder
                die du uns aktiv über das Kontaktformular gibst.
              </p>

              <h2>Hosting</h2>
              <p>
                Die Website wird bei Vercel Inc. (USA) gehostet. Beim Aufruf
                verarbeitet Vercel technisch notwendige Server-Logdaten (u. a.
                IP-Adresse, Zeitpunkt, aufgerufene Seite) zur Auslieferung und
                Absicherung der Seite (Art. 6 Abs. 1 lit. f DSGVO). Mit Vercel
                besteht ein Auftragsverarbeitungsvertrag; die Übermittlung in
                die USA stützt sich auf EU-Standardvertragsklauseln.
              </p>

              <h2>Kontaktformular</h2>
              <p>
                Wenn du uns über das Formular schreibst, verarbeiten wir die
                angegebenen Daten (Name, E-Mail, Unternehmen sowie deine
                Nachricht und optionale Angaben) ausschließlich zur Bearbeitung
                und Beantwortung deiner Anfrage (Art. 6 Abs. 1 lit. b DSGVO).
                Die Anfrage wird in unserem CRM-System Attio (Attio Ltd.,
                Vereinigtes Königreich) gespeichert; Bestätigungs- und
                Antwortmails werden über den Dienst Resend (Resend Inc., USA)
                versendet. Mit beiden Anbietern bestehen
                Auftragsverarbeitungsverträge; Übermittlungen in Drittländer
                stützen sich auf EU-Standardvertragsklauseln bzw. den
                Angemessenheitsbeschluss für das Vereinigte Königreich.
              </p>
              <p>
                Wir speichern Anfragen so lange, wie es für die Bearbeitung und
                eine mögliche Zusammenarbeit nötig ist, längstens [Frist, z. B.
                24 Monate] nach dem letzten Kontakt, soweit keine gesetzlichen
                Aufbewahrungspflichten entgegenstehen.
              </p>

              <h2>Deine Rechte</h2>
              <p>
                Du hast das Recht auf Auskunft, Berichtigung, Löschung,
                Einschränkung der Verarbeitung, Datenübertragbarkeit und
                Widerspruch (Art. 15–21 DSGVO) sowie das Recht, dich bei einer
                Datenschutz-Aufsichtsbehörde zu beschweren. Schreib uns dazu an{" "}
                <a href={`mailto:${site.email}`}>{site.email}</a>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
