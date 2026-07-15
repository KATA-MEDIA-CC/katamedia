"use client";

import { useState } from "react";
import Link from "next/link";
import { dimensions, cta } from "@/lib/site";

// Client-side only. Nothing is stored, nothing is sent: the visitor is scoring
// themselves, and the moment we post it anywhere it stops being an audit and
// starts being a form.
const OPTIONS = [
  { label: "No", value: 0 },
  { label: "Partly", value: 1 },
  { label: "Yes", value: 2 },
] as const;

const TOTAL = dimensions.length * 3 * 2; // 36

// RAG per dimension, once all three of its statements are answered.
function tone(score: number) {
  if (score >= 5) return "g";
  if (score >= 3) return "a";
  return "r";
}

export function SelfAudit() {
  // key: "dimIndex:statementIndex"
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const answered = Object.keys(answers).length;
  const total = Object.values(answers).reduce((a, b) => a + b, 0);
  const complete = answered === dimensions.length * 3;

  const dimScore = (d: number) =>
    [0, 1, 2].reduce((a, i) => a + (answers[`${d}:${i}`] ?? 0), 0);
  const dimDone = (d: number) =>
    [0, 1, 2].every((i) => answers[`${d}:${i}`] !== undefined);

  let verdict = (
    <>Answer all eighteen. Then we talk about what it means.</>
  );
  if (complete && total >= 30) {
    verdict = (
      <>
        <i>Ordered.</i> Keep it that way, and pressure-test it once a year.
      </>
    );
  } else if (complete && total >= 20) {
    verdict = (
      <>
        Fragments showing. Two or three dimensions are costing you money.{" "}
        <i>Worth a call.</i>
      </>
    );
  } else if (complete) {
    verdict = (
      <>
        From fragments — <i>order.</i> Start with the audit. Fixed fee, and the
        roadmap is yours to keep.
      </>
    );
  }

  return (
    <>
      {dimensions.map((d, di) => (
        <section className="feature sa-dim" key={d.no}>
          <div className="wrap">
            <div className="sa-head">
              <span className="spec">
                <span className="no">{d.no}</span>
              </span>
              <h2>{d.title}</h2>
              <span
                className={`sa-dot ${dimDone(di) ? tone(dimScore(di)) : ""}`}
                aria-hidden="true"
              />
            </div>
            <ul className="sa-list">
              {d.statements.map((st, si) => {
                const key = `${di}:${si}`;
                return (
                  <li className="sa-stmt" key={st}>
                    <span className="sa-tx" id={`s-${key}`}>
                      {st}
                    </span>
                    <span
                      className="sa-opts"
                      role="radiogroup"
                      aria-labelledby={`s-${key}`}
                    >
                      {OPTIONS.map((o) => (
                        <button
                          key={o.label}
                          type="button"
                          role="radio"
                          aria-checked={answers[key] === o.value}
                          className={answers[key] === o.value ? "on" : ""}
                          onClick={() =>
                            setAnswers((a) => ({ ...a, [key]: o.value }))
                          }
                        >
                          {o.label}
                        </button>
                      ))}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      ))}

      <section className="feature">
        <div className="wrap">
          <div className="sa-result">
            <p className="rk">Your score</p>
            <p className="sa-score" aria-live="polite">
              {answered ? total : "\u2013"}
              <em> / {TOTAL}</em>
            </p>
            <p className="sa-verdict">{verdict}</p>
            <Link href={cta.href} className="btn dk sa-cta">
              <span className="dot" />
              {cta.label}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
