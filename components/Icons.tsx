// Thin geometric icon set — same hairline weight as the CI rules and frames.
// One clay accent element per icon.

type IconName = "controlling" | "strategy" | "organisation" | "ai";

export function PillarIcon({ name }: { name: IconName }) {
  switch (name) {
    case "controlling":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <line x1="2" y1="21" x2="22" y2="21" />
          <line x1="5" y1="21" x2="5" y2="14" />
          <line x1="11" y1="21" x2="11" y2="9" />
          <line x1="17" y1="21" x2="17" y2="12" stroke="#C0532C" />
        </svg>
      );
    case "strategy":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="12" cy="12" r="1" fill="#C0532C" stroke="#C0532C" />
        </svg>
      );
    case "organisation":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="5" r="2.4" />
          <circle cx="5" cy="19" r="2.4" />
          <circle cx="19" cy="19" r="2.4" stroke="#C0532C" />
          <line x1="11" y1="7" x2="6" y2="17" />
          <line x1="13" y1="7" x2="18" y2="17" />
        </svg>
      );
    case "ai":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <line x1="12" y1="3" x2="12" y2="21" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="6" y1="6" x2="18" y2="18" />
          <line x1="18" y1="6" x2="6" y2="18" />
          <circle cx="12" cy="12" r="2" fill="#C0532C" stroke="#C0532C" />
        </svg>
      );
  }
}
