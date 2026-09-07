import { Reveal } from "@/components/Reveal";
import { valuePoints } from "@/lib/site";

// "How we create value" — the stepped list on the right of the section (the big
// heading sits on the left). Interaction is unlike the flip tiles: hovering a
// row slides it in, draws a clay rail down its left edge, brightens its copy
// and dims the rest. Everything stays visible.
export function ValuePoints() {
  return (
    <Reveal className="vlist" stagger>
      {valuePoints.map((p, i) => (
        <div className="vrow" key={p.t}>
          <span className="vrow-no">{String(i + 1).padStart(2, "0")}</span>
          <div className="vrow-body">
            <h3 className="vrow-t">{p.t}</h3>
            <p className="vrow-d">{p.d}</p>
          </div>
        </div>
      ))}
    </Reveal>
  );
}
