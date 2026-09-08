import Link from "next/link";
import { Lockup } from "@/components/Lockup";
import { Defrag } from "@/components/Defrag";
import { nav, site } from "@/lib/site";

// Footer = lockup + defrag, then three rows of links and meta.
// The closing surface carries the email, LinkedIn and the legal links —
// the last thing a visitor reads before deciding to write.
export function Footer() {
  const year = 2026;
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-top">
          <div className="foot-mk">
            <Lockup size="lg" tagline={site.tagline} />
          </div>
          <div className="foot-defrag">
            <Defrag cells={30} size="lg" loop loopCount={5} />
            <p className="defragcap">
              From fragments, <b>order.</b>
            </p>
          </div>
        </div>
        <div className="foot-links">
          <div className="foot-contact">
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <a href={site.linkedin} rel="noopener noreferrer" target="_blank">
              LinkedIn
            </a>
          </div>
          <nav className="foot-nav" aria-label="Footer">
            {nav.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
            {/* legally required (DE) — German labels on purpose, so the
                obligation is recognisable at a glance */}
            <Link href="/imprint" className="foot-legal">
              Impressum
            </Link>
            <Link href="/privacy" className="foot-legal">
              Datenschutz
            </Link>
          </nav>
          <p className="foot-meta">
            © {year} {site.name} · <b>{site.domain}</b>
          </p>
        </div>
      </div>
    </footer>
  );
}
