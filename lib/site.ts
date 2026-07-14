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
  // Shared alias to all three founders. Enquiries land here, and it's the
  // fallback shown if the form can't send. Founders' direct addresses are on
  // the founders list below.
  email: "hello@katamedia.cc",
  // Drives the sitewide <title>, the OG title and the home hero kicker.
  // "Architects" over "Advisory" is a deliberate positioning trade: advisors
  // advise on decisions, architects design and build. It costs us the search
  // term — nobody googles "production architects" — so `short` below carries
  // the discoverable language instead. See it as brand-first, SEO-second.
  descriptor: "Independent Production Architects",
  // Doubles as the home meta description, so it has to do two jobs: lead with
  // what we build (not with our independence — that's a controller's opening),
  // and still contain the words people actually search for.
  short:
    "We design and build how brands and agencies make content — production strategy, capability, AI and cost. Independently.",
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
  { label: "Services", href: "/services" },
  { label: "Approach", href: "/approach" },
  { label: "Team", href: "/team" },
  { label: "Contact", href: "/contact" },
];

// The single call-to-action, surfaced in the nav on every page.
export const cta = { label: "Book a call", href: "/contact" } as const;

// The founders, and the three numbers that place their portrait.
//
// The photos were shot at three different distances, so three identical boxes
// would show three different head sizes. Cropping can only ever crop *in*, so
// matching the heads inside one fixed box means the closest shot sets the
// ceiling and the wider ones lose their backgrounds. Instead the FRAME absorbs
// the difference: a wide shot gets a wide frame and keeps its world, and every
// head still lands the same size on the page.
//
// All three come from measuring the file itself — nothing here is taste:
//   ar = frame width / frame height
//   k  = head height (crown→chin) / frame height   ← literally how close the camera was
//   e  = eye height from frame top / frame height
//
// Everything on screen derives from them: column width ∝ ar/k, and the frame's
// aspect-ratio is ar / (e + DROP·k). Swap a photo without re-measuring and the
// heads silently drift out of register.
//
// DROP (globals.css) is shared by all three — that is what puts every eyeline
// the same distance off the rule. It is capped by the tightest photo: the frame
// can never be taller than the source, or a bare --paper-3 gap opens under the
// chin. Ceiling here is 1.049 (Jankel, whose frame already uses 97.1% of his
// photo's height); we run 1.0. Re-check that ceiling if a portrait is replaced.
export const founders = [
  {
    name: "Justin Stiebel",
    role: "Co-founder · Advisory",
    email: "justin@katamedia.cc",
    note: "Production controlling and advisory specialist with deep knowledge of the German and European market — its rates, its production companies, its directors.",
    photo: "/team/justin.png",
    ar: 1.486, // 1058 × 712
    k: 0.5997, // closest of the three — seated, leaning in
    e: 0.316,
  },
  {
    name: "Cornelius Roenz",
    role: "Co-founder",
    email: "cornelius@katamedia.cc",
    note: "Production leader who has built and run production functions at agency and brand level across Europe — from the set to the boardroom.",
    photo: "/team/cornelius.png",
    ar: 1.3953, // 960 × 688
    k: 0.3517, // the widest shot — his frame is the one that keeps the bridge
    e: 0.2587,
  },
  {
    name: "Jankel Huppertz",
    role: "Co-founder",
    email: "jankel@katamedia.cc",
    note: "Production leader across agency production — how TVC, content and campaigns work, from idea to execution, and where value is made or lost.",
    photo: "/team/jankel.png",
    ar: 1.5607, // 1080 × 692
    k: 0.5954, // sets the DROP ceiling — 97.1% of his photo height is used
    e: 0.3757,
  },
] as const;

// The four service pillars (from the pitch — Four pillars. One partner.)
// Ordered as the arc we actually work in: design the system, build it,
// modernise it, then run it with rigour. Controlling sits last deliberately —
// it is the proof of discipline, not the identity. The numbers are read as a
// hierarchy claim, so this order IS the positioning: change it with care.
export const pillars = [
  {
    no: "01",
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
    no: "02",
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
    no: "03",
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
  {
    no: "04",
    icon: "controlling" as const,
    title: "Production Controlling",
    lead: "Cost intelligence and real-time visibility across every production.",
    items: [
      "Budget development & management",
      "Cost reporting & variance analysis",
      "Vendor & supplier negotiation",
      "Buyout & rights management",
      "Post-production cost control",
    ],
  },
] as const;

// How we engage — the three low-commitment ways a relationship starts.
export const entryPoints = [
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

// The extended partner network — specialists working alongside the founders.
// Roles are being filled; update `status` as each partner lands.
export const partnerNetwork = [
  {
    no: "01",
    discipline: "Finance",
    body: "Cost modelling, financial governance, and the numbers underneath every production decision.",
    status: "Joining soon",
  },
  {
    no: "02",
    discipline: "Strategy",
    body: "Brand and content strategy at the altitude where production decisions are actually made.",
    status: "Joining soon",
  },
  {
    no: "03",
    discipline: "AI",
    body: "Applied AI in production — tooling, workflow integration, and the governance around it.",
    status: "Joining soon",
  },
  {
    no: "04",
    discipline: "Creative",
    body: "Creative direction, and the bridge between what is conceived and what can be built.",
    status: "Joining soon",
  },
  {
    no: "05",
    discipline: "Production",
    body: "Specialist production capability across formats, markets and scales.",
    status: "Joining soon",
  },
] as const;
