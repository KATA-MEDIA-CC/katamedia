// Thin geometric icon set — same hairline weight as the CI rules and frames.
// One clay accent element per icon.

type IconName = "controlling" | "strategy" | "organisation" | "ai";

type DimName =
  | "workflow"
  | "systems"
  | "budget"
  | "team"
  | "quality"
  | "vendor";

// The six Method dimensions, drawn to the same spec as the pillar set:
// hairline geometry, stroke inherited from CSS, exactly one clay accent each.
export function DimensionIcon({ name }: { name: DimName }) {
  switch (name) {
    case "workflow": // brief → delivery, one line, stations along it
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <line x1="2" y1="12" x2="22" y2="12" />
          <circle cx="5" cy="12" r="2.2" />
          <circle cx="12" cy="12" r="2.2" />
          <circle cx="19" cy="12" r="2.2" fill="#C0532C" stroke="#C0532C" />
        </svg>
      );
    case "systems": // the stack, one layer carrying the accent
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="4" y="4" width="16" height="4" />
          <rect x="4" y="10" width="16" height="4" stroke="#C0532C" />
          <rect x="4" y="16" width="16" height="4" />
        </svg>
      );
    case "budget": // the whole, and the slice under scrutiny
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <line x1="12" y1="12" x2="12" y2="3" />
          <line x1="12" y1="12" x2="19.8" y2="7.5" stroke="#C0532C" />
        </svg>
      );
    case "team": // three heads, one line of accountability
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="6" r="2.4" fill="#C0532C" stroke="#C0532C" />
          <circle cx="5" cy="13" r="2.4" />
          <circle cx="19" cy="13" r="2.4" />
          <line x1="3" y1="20" x2="21" y2="20" />
        </svg>
      );
    case "quality": // the frame, and the mark that passes it
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" />
          <polyline points="7.5,12.5 10.5,15.5 16.5,8.5" stroke="#C0532C" />
        </svg>
      );
    case "vendor": // two parties, the overlap is the relationship
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="9" cy="12" r="6.5" />
          <circle cx="15" cy="12" r="6.5" />
          <circle cx="12" cy="12" r="1" fill="#C0532C" stroke="#C0532C" />
        </svg>
      );
  }
}

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
