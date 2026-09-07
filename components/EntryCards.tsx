import Link from "next/link";
import { ReactNode } from "react";
import { Reveal } from "@/components/Reveal";
import { Flip } from "@/components/Flip";
import { entryPoints } from "@/lib/site";

// The three entry cards (Audit · Workshop · Pilot), shared by Home and
// /services. Extracted from the two inline maps for one reason: the word
// "Approach" in the audit body now links to /approach (CR feedback, Jul 2026),
// so the body string needs splitting before it renders.
function linkifyApproach(text: string): ReactNode {
  const parts = text.split("the Approach");
  if (parts.length === 1) return text;
  return (
    <>
      {parts[0]}
      the{" "}
      <Link href="/approach" className="mlink">
        Approach
      </Link>
      {parts.slice(1).join("the Approach")}
    </>
  );
}

export function EntryCards() {
  return (
    <Reveal className="trio" stagger>
      {entryPoints.map((d) => (
        <Flip
          className="card"
          key={d.title}
          front={<span className="c-title">{d.title}</span>}
          back={
            <>
              <span className="c-meta">{d.meta}</span>
              <p>{linkifyApproach(d.body)}</p>
            </>
          }
        />
      ))}
    </Reveal>
  );
}
