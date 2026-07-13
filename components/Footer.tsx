import Link from "next/link";
import { Lockup } from "@/components/Lockup";
import { Defrag } from "@/components/Defrag";
import { nav, site } from "@/lib/site";

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
