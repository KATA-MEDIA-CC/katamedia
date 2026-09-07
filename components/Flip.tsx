import { CSSProperties, ReactNode } from "react";

// A rounded box that turns on hover to reveal its back face. The spin
// direction is randomised per card (some flip left, some right) and reverses
// on mouse-out — all in CSS (see .flip in globals.css). This is a server
// component, so Math.random() runs at build: a fixed, random-looking mix is
// baked into the static HTML, with no hydration mismatch.
//
// Direction is passed as a CSS custom property so one :hover rule drives every
// card. Keyboard users get the same flip via :focus-within.
export function Flip({
  className = "",
  front,
  back,
}: {
  className?: string;
  front: ReactNode;
  back: ReactNode;
}) {
  const dir = Math.random() < 0.5 ? 1 : -1;
  return (
    <div
      className={`flip ${className}`}
      style={{ "--flip-dir": dir } as CSSProperties}
    >
      <div className="flip-inner">
        <div className="flip-face flip-front">{front}</div>
        <div className="flip-face flip-back">{back}</div>
      </div>
    </div>
  );
}
