import Image from "next/image";
import { founders } from "@/lib/site";
import { Reveal } from "@/components/Reveal";

type CSSVars = React.CSSProperties & Record<string, string | number>;

// ar/k is the width each frame needs for its head to land at the shared size:
// the wider the shot, the wider the frame, and the background survives. See the
// derivation on `founders` in lib/site.ts.
const ratio = founders.map((f) => f.ar / f.k);
const widest = Math.max(...ratio);

// Passed as a variable, NOT as inline grid-template-columns — an inline
// declaration outranks the media query and the row would never collapse on a
// phone.
const cols = ratio.map((r) => `${r.toFixed(3)}fr`).join(" ");

export function Founders() {
  return (
    <>
      <Reveal className="founders" style={{ "--cols": cols } as CSSVars} stagger>
        {founders.map((f, i) => (
          <div
            className="founder"
            key={f.email}
            style={
              {
                "--ar": f.ar,
                "--k": f.k,
                "--e": f.e,
                // stacked on a phone there are no columns to hold the ratio, so
                // each plate takes its share of the width directly — the heads
                // stay matched and the right edge rags.
                "--fw": (ratio[i] / widest).toFixed(4),
                // Explicit column. .f-base spans 1/-1 with a definite row, so
                // grid places it FIRST and it claims every explicit column —
                // auto-placed founders then spill into implicit columns and
                // never receive the fr ratios. Definite items may overlap, so
                // naming the column puts them back and lets the rule cross them.
                "--i": i + 1,
              } as CSSVars
            }
          >
            <figure className="f-fig">
              <Image
                src={f.photo}
                // Empty on purpose: .f-nm names the person directly below, and a
                // real alt would make a screen reader announce each founder twice.
                alt=""
                width={1600}
                height={Math.round(1600 / f.ar)}
                sizes="(max-width: 720px) 92vw, 45vw"
              />
            </figure>
            <div className="f-txt">
              <div className="f-nm">{f.name}</div>
              <div className="f-ro">{f.role}</div>
              <p className="f-note">{f.note}</p>
              <a className="f-mail" href={`mailto:${f.email}`}>
                <span className="d" />
                {f.email}
              </a>
            </div>
          </div>
        ))}
        {/* the datum: one rule all three plates stand on, drawn across the
            gaps so the flush bottoms read as an alignment, not a coincidence */}
        <span className="f-base" aria-hidden="true" />
      </Reveal>
    </>
  );
}
