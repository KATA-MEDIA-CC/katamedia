import Link from "next/link";
import { Lockup } from "@/components/Lockup";
import { Defrag } from "@/components/Defrag";
import { nav, site, cred } from "@/lib/site";

// Footer = lockup + defrag, then three rows of links and meta.
// Built out on founder feedback (Jul 2026): the closing surface now carries
// the email, LinkedIn and — once more, deliberately — the independence
// statement. It is the last thing a visitor reads before deciding to write.
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
              From fragments — <b>order.</b>
            </p>
          </div>
        </div>
        <div className="foot-links">
          <p className="foot-ind">{cred.independence}</p>
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
          </nav>
          <p className="foot-meta">
            © {year} {site.name} · <b>{site.domain}</b>
          </p>
        </div>
      </div>
    </footer>
  );
}
