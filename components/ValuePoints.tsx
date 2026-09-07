import { Reveal } from "@/components/Reveal";
import { valuePoints } from "@/lib/site";

// "How we create value" — three points shown as open editorial columns, not
// cards. The interaction is deliberately unlike the flip tiles: on hover a clay
// rule draws across the top of the column, the column lifts, and the copy
// brightens. Everything stays visible — the motion emphasises, it never hides.
export function ValuePoints() {
  return (
    <Reveal className="vpoints" stagger>
      {valuePoints.map((p, i) => (
        <div className="vpoint" key={p.t}>
          <span className="vp-bar" aria-hidden="true" />
          <span className="vp-no">{String(i + 1).padStart(2, "0")}</span>
          <h3 className="vp-t">{p.t}</h3>
          <p className="vp-d">{p.d}</p>
        </div>
      ))}
    </Reveal>
  );
}
