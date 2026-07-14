import Image from "next/image";
import { founders } from "@/lib/site";
import { Reveal } from "@/components/Reveal";

type CSSVars = React.CSSProperties & Record<string, string | number>;

// Three identical plates. Justin's photo sets the frame — his native ratio, his
// crop — and the other two are zoomed into it until every head renders the same
// size and every pair of eyes sits on the same line. Cornelius takes the most
// crop, because he was shot widest; his bridge is the price of a uniform row.
//
// Derived from the measured ar/k/e in lib/site.ts:
//   zoom ∝ ar/k    how far each photo must come in for its head to match
//   r    = rendered image height ÷ frame height
//   oy   = EYE_LINE − e·r        puts every eyeline at the same height
const FRAME_AR = founders[0].ar; // Justin's native ratio

// Where the eyes sit as a fraction of frame height — the upper third.
const EYE_LINE = 0.33;

// Centre-x of each face as a fraction of photo width. Eyeballed off the files;
// the only number here that isn't measured.
const FACE_X = [0.45, 0.48, 0.4];

const need = founders.map((f) => f.ar / f.k);
const tightest = Math.min(...need);

// A photo can only be nudged vertically if it renders taller than its frame, so
// the zoom has to clear enough slack for ONE eye-line to satisfy all three at
// once. Justin at zoom 1 has zero slack, which is what forces a global factor.
// Solve for the smallest one that admits EYE_LINE rather than guessing it.
function solveZ() {
  for (let Z = 1; Z <= 3; Z += 0.005) {
    const rs = founders.map((f, i) => (Z * (need[i] / tightest) * FRAME_AR) / f.ar);
    const lo = Math.max(...founders.map((f, i) => 1 - rs[i] * (1 - f.e)));
    const hi = Math.min(...founders.map((f, i) => f.e * rs[i]));
    if (EYE_LINE >= lo && EYE_LINE <= hi) return Math.round(Z * 1000) / 1000;
  }
  throw new Error("no zoom satisfies EYE_LINE for these portraits");
}
const Z = solveZ();

const plates = founders.map((f, i) => {
  const zoom = Z * (need[i] / tightest);
  const r = (zoom * FRAME_AR) / f.ar; // rendered height ÷ frame height
  const oy = EYE_LINE - f.e * r; // ≤ 0 by construction
  const ox = Math.min(0, Math.max(1 - zoom, 0.5 - FACE_X[i] * zoom)); // always covers
  return { zoom, ox, oy };
});

export function Founders() {
  return (
    <Reveal className="founders" style={{ "--frame-ar": FRAME_AR } as CSSVars} stagger>
      {founders.map((f, i) => (
        <div
          className="founder"
          key={f.email}
          style={
            {
              "--zoom": plates[i].zoom.toFixed(4),
              "--ox": `${(plates[i].ox * 100).toFixed(3)}%`,
              "--oy": `${(plates[i].oy * 100).toFixed(3)}%`,
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
              sizes="(max-width: 720px) 92vw, 33vw"
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
    </Reveal>
  );
}
