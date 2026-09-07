import { cred } from "@/lib/site";
import { Reveal } from "@/components/Reveal";

// The cred band — one slim strip directly under the home hero.
//
// Founder feedback (Jul 2026): the strongest argument for the 45-minute call
// is the three founders' pedigree, and it lived only on /team, which few
// visitors reach. This band puts it one scroll-millimetre under the headline.
// The years read loud; the houses roll past as an auto-scrolling roster
// (Sep 2026) — bold, upright, larger — so the pedigree reads as a client wall.
export function Cred() {
  // Repeat the roster enough times that half the track always exceeds the
  // widest viewport: the CSS animates the track by translateX(-50%), so an
  // even number of full passes keeps the loop seamless with no edge gap.
  const PASSES = 8;
  // Shuffle the roster once (Fisher-Yates), then repeat that single order
  // across every pass — the marquee loops on translateX(-50%), so each pass
  // must be identical for the seam to stay invisible. Cred is a server
  // component, so this runs at build time: one random order, baked into the
  // static HTML (a fresh order on each deploy, no hydration mismatch).
  const shuffled = [...cred.houses];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  const roster = Array.from({ length: PASSES }, () => shuffled).flat();
  const last = cred.houses.length - 1;

  return (
    <section className="cred" aria-label="Track record">
      <div className="wrap">
        <Reveal className="cred-in">
          <p className="cred-years">{cred.years}</p>
          <p className="sr-only">
            Experience built at {cred.houses.slice(0, last).join(", ")} and{" "}
            {cred.houses[last]}.
          </p>
          <div className="cred-marquee" aria-hidden="true">
            <div className="cred-track">
              {roster.map((h, i) => (
                <span className="cred-house" key={i}>
                  {h}
                  <span className="cred-sep">·</span>
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
