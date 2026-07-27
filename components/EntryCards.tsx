import Link from "next/link";
import { ReactNode } from "react";
import { Reveal } from "@/components/Reveal";
import { entryPoints } from "@/lib/site";

// The three entry cards (Audit · Workshop · Pilot), shared by Home and
// /services. Extracted from the two inline maps for one reason: the word
// "Method" in the audit body now links to /approach (CR feedback, Jul 2026),
// so the body string needs splitting before it renders.
function linkifyMethod(text: string): ReactNode {
  const parts = text.split("the Method");
  if (parts.length === 1) return text;
  return (
    <>
      {parts[0]}
      the{" "}
      <Link href="/approach" className="mlink">
        Method
      </Link>
      {parts.slice(1).join("the Method")}
    </>
  );
}

export function EntryCards() {
  return (
    <Reveal className="trio" stagger>
      {entryPoints.map((d) => (
        <div className="card" key={d.title}>
          <h3>{d.title}</h3>
          <span className="c-meta">{d.meta}</span>
          <p className="c-spacer">{linkifyMethod(d.body)}</p>
        </div>
      ))}
    </Reveal>
  );
}
