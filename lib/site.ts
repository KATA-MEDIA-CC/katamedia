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

// The founders, and the three numbers that place each portrait.
//
// The three photos were shot at three different distances, so dropping them
// into three identical plates with object-fit:cover would render three
// different head sizes. Instead each image is zoomed and offset until every
// head is the same size on the page and every pair of eyes sits on one line.
//
// All three numbers come from measuring the file — none of them is taste:
//   ar = frame width / frame height
//   k  = head height (crown→chin) / frame height  ← literally how close the camera was
//   e  = eye height from frame top / frame height
//
// components/Founders.tsx turns them into --zoom / --ox / --oy, and solves the
// one global zoom factor that lets a single eye-line satisfy all three at once.
// Swap a portrait without re-measuring and the heads silently drift apart.
// The plate treatment itself is the kata-imagery skill (.claude/skills).
export const founders = [
  {
    name: "Justin Stiebel",
    role: "Strategy, organisational design and advisory",
    email: "justin@katamedia.cc",
    notes: [
      "Production leader with extensive experience building and running production functions at agency and brand level across Europe.",
      "Has operated at every level of high end commercial production, from the set to the boardroom. Knows what it takes to deliver creatively demanding, commercially complex campaigns, and what it takes to lead the organisations that produce them through growth, transition, and change.",
      "Specialist in production strategy, organisational transformation, and sustainable structures for brands and agencies navigating a shifting market.",
    ],
    photo: "/team/justin.png",
    ar: 1.486, // 1058 × 712
    k: 0.5997, // closest of the three — seated, leaning in
    e: 0.316,
  },
  {
    name: "Cornelius Roenz",
    role: "Strategy, production leadership and executive production",
    email: "cornelius@katamedia.cc",
    notes: [
      "Production controlling and advisory specialist with deep market knowledge across German and European TVC, content, and campaign production.",
      "Has built and managed production budgets across formats, from small social campaigns to large scale international shoots. Knows what things cost, what gets padded, and where clients are being underserved.",
      "Specialist in the German market. Its rates, its production companies, its directors, and its dynamics.",
    ],
    photo: "/team/cornelius.png",
    ar: 1.3953, // 960 × 688
    k: 0.3517, // the widest shot — takes the most crop to match the others
    e: 0.2587,
  },
  {
    name: "Jankel Huppertz",
    role: "Production leadership, operations and advisory",
    email: "jankel@katamedia.cc",
    notes: [
      "Production leader with deep experience across agency production. Understands how TVC, content, and campaign production works, from idea to execution.",
      "Has built and managed production across formats and scales, from agile content to large international campaigns. Knows how to run complex productions, align teams, and deliver against creative and commercial demands.",
      "Specialist in production structures, processes, and budgets, and where value is created or lost.",
    ],
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

// The extended partner network — nine sectors, not nine people.
//
// Deliberately unnamed: there is no single specialist per sector, there are
// several, and which one comes in depends on the brief. Naming them would
// promise the wrong thing (and date the moment someone moves on), so each tile
// describes the KIND of person instead. `who` is what opens in the modal.
export const partnerNetwork = [
  {
    no: "01",
    discipline: "Finance",
    body: "Cost modelling, financial governance, and the numbers underneath every production decision.",
    lead: "Someone who has signed the budget off, not just built it.",
    who: "Controllers and heads of production finance who have carried real P&L responsibility inside a brand, an agency or a production company. People who can model a slate before it is committed, and who know which line in a bid is the one that actually moves.",
  },
  {
    no: "02",
    discipline: "Strategy",
    body: "Brand and content strategy at the altitude where production decisions are actually made.",
    lead: "Someone who has decided what gets made, not only how.",
    who: "Brand and content strategists who have sat on both the client and the agency side of the table. People who can tell you whether the work should exist before we spend a month costing it.",
  },
  {
    no: "03",
    discipline: "AI",
    body: "Applied AI in production — tooling, workflow integration, and the governance around it.",
    lead: "Someone who has shipped it, not demoed it.",
    who: "Practitioners who have put AI into a live pipeline and lived with the result — the tooling, the integration, the governance. People who can tell the difference between a saving and a slide.",
  },
  {
    no: "04",
    discipline: "Creative",
    body: "Creative direction, and the bridge between what is conceived and what can be built.",
    lead: "Someone who has made the thing, not just approved it.",
    who: "Creative directors and makers who have stood on both sides of the gap between the idea and the build. People who can protect the work through its constraints without pretending the constraints are not real.",
  },
  {
    no: "05",
    discipline: "Production",
    body: "Specialist production capability across formats, markets and scales.",
    lead: "Someone who has run this, at this scale, in this market.",
    who: "Producers and heads of production with specialist depth — a format, a territory, a scale. The hand you bring in when the brief needs someone who has done exactly this before, not something adjacent.",
  },
  {
    no: "06",
    discipline: "HR",
    body: "Hiring, structure and retention for the people who actually make the work.",
    lead: "Someone who has built the team, not just the org chart.",
    who: "People and organisational specialists who have hired, restructured and held on to production talent. People who know what a production function needs in order to function — and what it costs when it does not.",
  },
  {
    no: "07",
    discipline: "Venture",
    body: "Building the business around the work — new studios, new divisions, new companies.",
    lead: "Someone who has built the business, not advised one.",
    who: "Founders and operators who have started, scaled and sold companies. The people we bring in when a client is building something new and wants someone who has carried that risk personally, not read about it.",
  },
  {
    no: "08",
    discipline: "Media",
    body: "Where the work lands, and how that shapes what gets made.",
    lead: "Someone who knows where the work has to land.",
    who: "Media and distribution specialists who understand how content behaves once it leaves the edit. People who work backwards from the channel to the brief, so production is not designing in the dark.",
  },
  {
    no: "09",
    discipline: "Talent Partnerships",
    body: "Connecting brands with exceptional talent across entertainment, culture and sport.",
    lead: "Someone with the relationships — and the judgement to use them.",
    who: "Specialists who put brands together with exceptional talent across entertainment, culture and sport. People who know who is right, who is actually available, and what the deal should cost.",
  },
] as const;
