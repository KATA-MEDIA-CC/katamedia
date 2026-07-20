import { cred } from "@/lib/site";
import { Reveal } from "@/components/Reveal";

// The cred band — one slim strip directly under the home hero.
//
// Founder feedback (Jul 2026): the strongest argument for the 45-minute call
// is the three founders' pedigree, and it lived only on /team, which few
// visitors reach. This band puts it one scroll-millimetre under the headline:
// the years, the houses, the independence — two lines that carry the whole
// positioning. It stays on the hero's ink so it reads as the hero's own
// colophon, not as the first content section.
export function Cred() {
  return (
    <section className="cred" aria-label="Track record and independence">
      <div className="wrap">
        <Reveal className="cred-in">
          <div className="cred-copy">
            <p className="cred-years">{cred.years}</p>
            <p className="cred-ind">{cred.independence}</p>
          </div>
          <ul className="cred-houses">
            {cred.houses.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
