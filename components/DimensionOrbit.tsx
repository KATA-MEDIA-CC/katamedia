"use client";

import { useState } from "react";
import { dimensions } from "@/lib/site";
import { DimensionIcon } from "@/components/Icons";

// The six dimensions as a radial "kata form": the dimensions orbit a centre,
// spokes run out to each, and hovering/focusing a node draws its spoke in clay
// and shows that dimension's detail in the centre. Below the breakpoint it
// falls back to a plain stacked list so all six read on a phone.
const R = 41; // node radius, % of the square
const START = -90; // first node sits at the top, then clockwise

export function DimensionOrbit() {
  const [active, setActive] = useState(0);
  const cur = dimensions[active];
  const step = 360 / dimensions.length;
  const point = (i: number) => {
    const a = ((START + i * step) * Math.PI) / 180;
    return { x: 50 + R * Math.cos(a), y: 50 + R * Math.sin(a) };
  };

  return (
    <>
      <div className="orbit" role="group" aria-label="The six dimensions">
        <svg
          className="orbit-svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          {dimensions.map((d, i) => {
            const p = point(i);
            return (
              <line
                key={d.title}
                x1="50"
                y1="50"
                x2={p.x}
                y2={p.y}
                className={`orbit-spoke${i === active ? " active" : ""}`}
              />
            );
          })}
          <circle className="orbit-ring" cx="50" cy="50" r="26" />
        </svg>

        <div className="orbit-center" aria-live="polite">
          <span className="oc-ico">
            <DimensionIcon name={cur.icon} />
          </span>
          <span className="oc-no">{cur.no}</span>
          <h3 className="oc-t">{cur.title}</h3>
          <p className="oc-b">{cur.body}</p>
        </div>

        {dimensions.map((d, i) => {
          const p = point(i);
          const short = d.title.split(" & ")[0];
          return (
            <button
              key={d.title}
              type="button"
              className={`orbit-node${i === active ? " active" : ""}`}
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              aria-pressed={i === active}
            >
              <span className="on-no">{d.no}</span>
              <span className="on-label">{short}</span>
            </button>
          );
        })}
      </div>

      {/* phone fallback: the full list, always visible */}
      <ul className="orbit-list">
        {dimensions.map((d) => (
          <li key={d.title}>
            <span className="ol-no">{d.no}</span>
            <div>
              <h3 className="ol-t">{d.title}</h3>
              <p className="ol-b">{d.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
