import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { SelfAudit } from "@/components/SelfAudit";
import { site, pageMetadata } from "@/lib/site";

// Deliberately absent from the nav: its only front door is the CTA at the foot
// of /approach. noindex keeps it out of search too, so it stays a thing you are
// given rather than a thing you find.
export const metadata: Metadata = {
  ...pageMetadata({
    title: "The Self-Audit",
    description:
      "Six dimensions, eighteen statements, ten minutes. Score your production setup the way we would.",
    path: "/self-audit",
  }),
  robots: { index: false, follow: true },
};

export default function SelfAuditPage() {
  return (
    <>
      <Hero
        variant="page"
        lead="The Kata Method · Six dimensions"
        title={
          <>
            Where does your production <em>leak?</em>
          </>
        }
        tag={site.tagline}
        desc="Eighteen statements. Ten minutes. Score each one honestly: yes, partly, or no. Most waste is invisible until someone maps it. This is the map."
      />
      <SelfAudit />
    </>
  );
}
