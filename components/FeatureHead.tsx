import { ReactNode } from "react";

// Section header: optional numbered spec frame (`no`), an optional clay
// crosshead (`kick`), the title (with clay <em>) and a deck. The drawn
// measuring rule was removed site-wide (Sep 2026).
export function FeatureHead({
  no,
  kick,
  title,
  deck,
}: {
  no?: string;
  kick?: string;
  title: ReactNode;
  deck?: string;
}) {
  return (
    <div className={`g12 fhead${no ? "" : " bare"}`}>
      {no ? (
        <span className="mk">
          <span className="spec">
            <span className="no">{no}</span>
          </span>
        </span>
      ) : null}
      <h2>
        {kick ? <span className="fkick">{kick}</span> : null}
        {title}
      </h2>
      {deck ? <p className="deck">{deck}</p> : null}
    </div>
  );
}
