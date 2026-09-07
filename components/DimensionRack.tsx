"use client";

import { CSSProperties, useState } from "react";
import { dimensions } from "@/lib/site";

// The six dimensions as a RACK FOCUS instrument (approach section). One lens,
// six focal planes: the active dimension is pulled tack-sharp while the other
// five stay in the same frame as soft bokeh. Turning the focus ring (the row of
// marks) racks between them. `compact` (home teaser) drops the reading panel.
const SPOTS = [
  [27, 29],
  [70, 23],
  [79, 57],
  [52, 71],
  [22, 61],
  [46, 43],
];
const DOTS = [10, 36.6, 63.3, 90];

export function DimensionRack({ compact = false }: { compact?: boolean }) {
  const [active, setActive] = useState(0);
  const cur = dimensions[active];
  const short = (t: string) => t.split(" & ")[0];

  return (
    <div className={`rack${compact ? " rack--compact" : ""}`}>
      <div className="rack-frame">
        <span className="rack-wm" aria-hidden="true">
          {cur.no}
        </span>
        <span className="rack-plane" aria-hidden="true" />
        {DOTS.map((x, i) => (
          <span
            key={i}
            className="rack-dot"
            style={{ left: `${x}%` } as CSSProperties}
            aria-hidden="true"
          />
        ))}
        {dimensions.map((d, i) => (
          <span
            key={d.title}
            className={`rack-chip ${i === active ? "sharp" : "soft"}`}
            style={
              { left: `${SPOTS[i][0]}%`, top: `${SPOTS[i][1]}%` } as CSSProperties
            }
            aria-hidden="true"
          >
            {short(d.title)}
          </span>
        ))}
      </div>

      {!compact && (
        <div className="rack-read" aria-live="polite">
          <span className="rr-no">No.{cur.no} / 06</span>
          <h3 className="rr-t">{cur.title}</h3>
          <p className="rr-b">{cur.body}</p>
        </div>
      )}

      <div className="rack-ring" aria-label="Focus: the six dimensions">
        {dimensions.map((d, i) => (
          <button
            key={d.title}
            type="button"
            className={`rack-mark${i === active ? " on" : ""}`}
            aria-pressed={i === active}
            aria-label={d.title}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onClick={() => setActive(i)}
          >
            <span className="rm-tick" aria-hidden="true" />
            <span className="rm-no">{d.no}</span>
            <span className="rm-l">{short(d.title)}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
