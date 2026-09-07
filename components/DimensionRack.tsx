"use client";

import { CSSProperties, useState } from "react";
import { dimensions } from "@/lib/site";

// The six dimensions as a RACK FOCUS instrument (approach section). One lens,
// six focal planes: the active dimension is pulled tack-sharp while the other
// five stay in the same frame as soft bokeh. Turning the focus ring (the row of
// marks) racks between them. `compact` (home teaser) drops the reading panel.
//
// It reads as looking THROUGH glass and changing the plane of focus, not a
// diagram: real depth-of-field (CSS blur), a clay focal-plane line, and the
// five unselected lenses never leave the frame — so the six always read as
// facets of one business.
const SPOTS = [
  [27, 29],
  [70, 23],
  [79, 57],
  [52, 71],
  [22, 61],
  [46, 43],
];

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
        <svg
          className="rack-pipe"
          viewBox="0 0 100 56"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <line x1="10" y1="28" x2="90" y2="28" />
          <circle cx="10" cy="28" r="1.1" />
          <circle cx="36.6" cy="28" r="1.1" />
          <circle cx="63.3" cy="28" r="1.1" />
          <circle cx="90" cy="28" r="1.1" />
        </svg>
        <span className="rack-plane" aria-hidden="true" />
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
          <p className="rr-meter">Scored red · amber · green</p>
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
