import { Fragment, ReactNode } from "react";

// Render *word* markers in a copy string as the clay pivot — italic + clay, in
// the serif. This is the CI's "one clay element per line" rule for body copy:
// the pivot word points, the rest of the run stays ink. Never mark more than
// one word per line.
export function pivot(text: string): ReactNode {
  return text.split(/\*([^*]+)\*/).map((part, i) =>
    i % 2 === 1 ? (
      <em className="pivot" key={i}>
        {part}
      </em>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    )
  );
}
