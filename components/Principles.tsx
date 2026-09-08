import { Reveal } from "@/components/Reveal";
import { pivot } from "@/components/Pivot";
import { approachPrinciples } from "@/lib/site";

// "How we work" — the seven principles behind every engagement. Two forms:
//   • default: a numbered editorial list (no · label · description), the full
//     version on /approach.
//   • plakativ: number + large label only, no description — the bold home
//     teaser that stands in for the approach without the six dimensions.
export function Principles({ plakativ = false }: { plakativ?: boolean } = {}) {
  return (
    <Reveal className={`prin${plakativ ? " prin--plakativ" : ""}`} stagger>
      {approachPrinciples.map((p, i) => (
        <div className="prin-item" key={p.t}>
          <span className="prin-no">{String(i + 1).padStart(2, "0")}</span>
          <span className="prin-t">{p.t}</span>
          {!plakativ && <span className="prin-d">{pivot(p.d)}</span>}
        </div>
      ))}
    </Reveal>
  );
}
