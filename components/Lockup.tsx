import { site } from "@/lib/site";

type Size = "xl" | "lg" | "md" | "sm";

// The kata lockup: the wordmark with the descriptor justified edge-to-edge
// beneath it (flex space-between — reliable where text-align-last:justify is
// not). Words are laid out as spans so the line always spans the mark.
export function Lockup({
  size = "sm",
  dark = false,
  tagline = site.tagline,
  className = "",
}: {
  size?: Size;
  dark?: boolean;
  tagline?: string;
  className?: string;
}) {
  const words = tagline.trim().split(/\s+/);
  return (
    <span className={`lockup ${size} ${dark ? "dk" : ""} ${className}`.trim()}>
      <span className="lk-mk">{site.wordmark}</span>
      <span className="lk-tag" aria-label={tagline}>
        {words.map((w, i) => (
          <span key={i}>{w}</span>
        ))}
      </span>
    </span>
  );
}
