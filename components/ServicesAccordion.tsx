"use client";

import { useState } from "react";
import { pillars, pillarBacks } from "@/lib/site";

// The four service pillars as an expand/collapse accordion (one open at a
// time). Each row opens to an intro line and its Key focus areas. Built in the
// house palette — hairline rows, clay accents — not a copy of the reference's
// colourway. Panels animate open with the grid-rows 0fr→1fr technique.
export function ServicesAccordion() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="acc">
      {pillars.map((p, i) => {
        const isOpen = open === i;
        const focus = pillarBacks[p.title] ?? [];
        return (
          <div className={`acc-item${isOpen ? " open" : ""}`} key={p.title}>
            <h3 className="acc-h">
              <button
                type="button"
                className="acc-head"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span className="acc-no">{String(i + 1).padStart(2, "0")}</span>
                <span className="acc-t">{p.title}</span>
                <span className="acc-ico" aria-hidden="true">
                  <i />
                  <i />
                </span>
              </button>
            </h3>
            <div className="acc-panel">
              <div className="acc-panel-in">
                <div className="acc-body">
                  <p className="acc-intro">{p.detail}</p>
                  {focus.length > 0 && (
                    <>
                      <p className="acc-k">Key focus areas</p>
                      <ul className="acc-list">
                        {focus.map((c) => (
                          <li key={c.t}>
                            <span className="acc-ct">{c.t}</span>
                            <span className="acc-cd">{c.d}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
