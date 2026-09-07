import { Reveal } from "@/components/Reveal";
import { DimensionIcon } from "@/components/Icons";
import { dimensions } from "@/lib/site";

// The six dimensions as a plain, static spec list — icon + number + name
// (+ body on the full /approach page). Deliberately simple: no instrument, no
// animation beyond the section reveal. `compact` (home teaser) drops the bodies.
export function DimensionList({ compact = false }: { compact?: boolean }) {
  return (
    <Reveal
      className={`dimlist${compact ? " dimlist--compact" : ""}`}
      stagger
    >
      {dimensions.map((d) => (
        <div className="dl-item" key={d.title}>
          <div className="dl-head">
            <span className="dl-ico">
              <DimensionIcon name={d.icon} />
            </span>
            <span className="dl-no">{d.no}</span>
          </div>
          <h3 className="dl-t">{d.title}</h3>
          {!compact && <p className="dl-b">{d.body}</p>}
        </div>
      ))}
    </Reveal>
  );
}
