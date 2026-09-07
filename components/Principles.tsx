import { Reveal } from "@/components/Reveal";
import { approachPrinciples } from "@/lib/site";

// The "how we work" principles, shown above the six dimensions on the approach.
// Each carries a short clay tick (the measuring motif) + a caps label + a line.
export function Principles() {
  return (
    <Reveal className="prin" stagger>
      {approachPrinciples.map((p) => (
        <div className="prin-item" key={p.t}>
          <span className="prin-t">{p.t}</span>
          <span className="prin-d">{p.d}</span>
        </div>
      ))}
    </Reveal>
  );
}
