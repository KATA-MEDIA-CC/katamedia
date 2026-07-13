// ─────────────────────────────────────────────────────────────────────────
// Central site configuration.
// Everything content- or brand-specific lives here so it can be changed in
// one place — domain, contact details, navigation, taglines.
// ─────────────────────────────────────────────────────────────────────────

import type { Metadata } from "next";

export const site = {
  name: "Kata",
  wordmark: "kata",
  domain: "katamedia.cc",
  url: "https://katamedia.cc",
  tagline: "Knowledge applied to action",
  descriptor: "Independent Production Advisory",
  short:
    "Independent production advisory for brands and agencies — without the conflicts built into the system.",
  belief: "We sit beside the decision — never above the process, never inside the margin.",
  booking: "Now booking · 2026",
} as const;

// Per-page metadata: correct canonical + full OpenGraph/Twitter (Next replaces
// the openGraph object per route rather than deep-merging, so include all
// fields). The og:image comes from app/opengraph-image.tsx automatically.
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = `${site.url}${path === "/" ? "" : path}`;
  const ogTitle = `${title} — ${site.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: "en_GB",
      url,
      title: ogTitle,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
    },
  };
}

export type NavItem = { label: string; href: string };

export const nav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Approach", href: "/approach" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

export const founders = [
  {
    name: "Justin Stiebel",
    role: "Co-founder · Advisory",
    email: "justin@katamedia.cc",
    note: "Production controlling and advisory specialist with deep knowledge of the German and European market — its rates, its production companies, its directors.",
  },
  {
    name: "Cornelius Roenz",
    role: "Co-founder",
    email: "cornelius@katamedia.cc",
    note: "Production leader who has built and run production functions at agency and brand level across Europe — from the set to the boardroom.",
  },
  {
    name: "Jankel Huppertz",
    role: "Co-founder",
    email: "jankel@katamedia.cc",
    note: "Production leader across agency production — how TVC, content and campaigns work, from idea to execution, and where value is made or lost.",
  },
] as const;

// The four service pillars (from the pitch — Four pillars. One partner.)
export const pillars = [
  {
    no: "01",
    icon: "controlling" as const,
    title: "Production Controlling",
    lead: "Cost intelligence and real-time visibility across every production.",
    items: [
      "Budget development & management",
      "Cost reporting & variance analysis",
      "Vendor & supplier negotiation",
      "Buyout & rights management",
      "The Kata Platform",
    ],
  },
  {
    no: "02",
    icon: "strategy" as const,
    title: "Strategic Advisory",
    lead: "Shaping how brands and agencies commission and plan content at scale.",
    items: [
      "Production strategy development",
      "Roster & director advisory",
      "Emerging format strategy",
      "Sustainable production",
      "International structures",
    ],
  },
  {
    no: "03",
    icon: "organisation" as const,
    title: "Organisational Setup & Studio Builds",
    lead: "Building the production capability organisations need — from scratch or from inside.",
    items: [
      "In-house department setup",
      "Agency production builds",
      "Technology stack selection",
      "VFX · Post · AI studio builds",
      "Production talent advisory",
    ],
  },
  {
    no: "04",
    icon: "ai" as const,
    title: "AI Integration & Transformation",
    lead: "Practical AI adoption in production — with governance, training, and real results.",
    items: [
      "AI readiness audit",
      "Tool selection & evaluation",
      "Workflow integration",
      "Training & upskilling",
      "Ethics & governance",
    ],
  },
] as const;

// Three low-commitment entry points (How to start — three front doors)
export const frontDoors = [
  {
    no: "01",
    title: "Audit",
    meta: "2–4 weeks · fixed fee",
    body: "Your production setup — mapped, benchmarked and scored across all six dimensions of the Method.",
  },
  {
    no: "02",
    title: "Workshop",
    meta: "1–2 days · fixed fee",
    body: "One topic — AI readiness, production strategy or process — worked through with your team, ending in a written deliverable.",
  },
  {
    no: "03",
    title: "Pilot",
    meta: "4–8 weeks · scoped fee",
    body: "A pressing project, run end to end with us embedded — from brief through to handover.",
  },
] as const;

// The Kata Method — six dimensions
export const dimensions = [
  {
    no: "01",
    title: "Workflow & Process",
    body: "We map the end-to-end flow from brief to delivery and quantify where time and money are lost. Most waste is invisible until someone maps it.",
  },
  {
    no: "02",
    title: "Technology & Systems",
    body: "We assess the tech stack, integration health and adoption — whether the investment is serving production goals or creating new complexity.",
  },
  {
    no: "03",
    title: "Budget & Resource",
    body: "We examine budget structure, cost-variance patterns and financial governance across the production lifecycle.",
  },
  {
    no: "04",
    title: "Team & Capability",
    body: "We map roles, decision rights, capability coverage and key-person risk. Who does what, who decides what, and what happens when someone leaves.",
  },
  {
    no: "05",
    title: "Pipeline & Quality",
    body: "We trace content from brief to archive and evaluate quality control, rework rates and feedback loops — where quality is made and where it erodes.",
  },
  {
    no: "06",
    title: "Vendor & Partner",
    body: "We segment the vendor portfolio and assess contract structure and service levels. Not all vendors are equal — most brands treat them as if they are.",
  },
] as const;

// Ways to engage
export const engagements = [
  {
    no: "01",
    kicker: "For live productions",
    title: "Embedded Advisory",
    body: "We sit alongside your team for the duration of a production — joining calls, reviewing documents, providing real-time input. Independent of the agency and the production company.",
  },
  {
    no: "02",
    kicker: "For defined deliverables",
    title: "Project-Based",
    body: "Focused engagements with a clearly defined scope, timeline and tangible outcomes — from in-house builds and strategy frameworks to audits and studio setups.",
  },
  {
    no: "03",
    kicker: "For ongoing relationships",
    title: "Retainer",
    body: "A fixed monthly engagement covering an agreed scope. Suited to clients with regular production volumes or ongoing transformation through the year.",
  },
  {
    no: "04",
    kicker: "For the platform only",
    title: "Platform Access",
    body: "Subscription access to the Kata Platform — standalone or bundled with advisory. Pricing based on active productions and user seats.",
  },
] as const;
