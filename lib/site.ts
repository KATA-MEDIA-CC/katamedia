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
    "We design and build how brands and agencies make content: production strategy, capability, AI and cost. Independently.",
  belief: "We sit beside the decision, never above the process and never inside the margin.",
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
  const ogTitle = `${title} · ${site.name}`;
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
    lead: "Building the production capability organisations need, from scratch or from inside.",
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
    lead: "Practical AI adoption in production, with governance, training, and real results.",
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
    body: "Your production setup: mapped, benchmarked and scored across all six dimensions of the Method.",
  },
  {
    no: "02",
    title: "Workshop",
    meta: "1–2 days · fixed fee",
    body: "One topic (AI readiness, production strategy or process), worked through with your team, ending in a written deliverable.",
  },
  {
    no: "03",
    title: "Pilot",
    meta: "4–8 weeks · scoped fee",
    body: "A pressing project, run end to end with us embedded, from brief through to handover.",
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
    body: "We assess the tech stack, integration health and adoption: whether the investment is serving production goals or creating new complexity.",
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
    body: "We trace content from brief to archive and evaluate quality control, rework rates and feedback loops: where quality is made and where it erodes.",
  },
  {
    no: "06",
    title: "Vendor & Partner",
    body: "We segment the vendor portfolio and assess contract structure and service levels. Not all vendors are equal. Most brands treat them as if they are.",
  },
] as const;

// The network — nine sectors, not nine people.
//
// Deliberately unnamed: several specialists sit behind each sector and the
// brief decides who comes in. Naming them would promise the wrong thing, and
// date the moment someone moves on. `who` is what opens in the panel.
//
// On the writing: an earlier pass gave every sector an aphorism of the form
// "Someone who has X, not just Y." Nine times. The antithesis is a tic and
// repeating it is what makes copy read as machine-written — so the lead line is
// gone, the sector name is the headline, and each paragraph is shaped
// differently on purpose. Keep it that way.
export const partnerNetwork = [
  {
    no: "01",
    discipline: "Finance",
    body: "What the work costs, what it should cost, and where the difference hides.",
    who: "Controllers and finance heads who have run the money at brands, agencies and production companies. Hand them a bid and the padded lines are circled by page two.",
  },
  {
    no: "02",
    discipline: "Strategy",
    body: "The questions that come before production, answered while they are still cheap.",
    who: "Should the work exist at all, and how much of it? Client-side and agency-side strategists who settle both questions before anyone spends a month costing the answer.",
  },
  {
    no: "03",
    discipline: "Technology",
    body: "The systems production runs on, and whether they still earn their keep.",
    who: "The unglamorous end of production: systems heads who have specified, migrated and decommissioned entire stacks. Licences are the visible cost, workarounds the real one. The first deliverable is usually a list of renewals to decline.",
  },
  {
    no: "04",
    discipline: "AI",
    body: "AI in the workflow: what goes in, where, and under whose rules.",
    who: "Practitioners. Each has put AI into a live pipeline and stayed for what broke: the tooling, the governance, the quiet failures six weeks in.",
  },
  {
    no: "05",
    discipline: "Creative",
    body: "Creative direction that survives contact with the budget.",
    who: "An idea gets sold on a Tuesday and value-engineered by Friday. Creative directors who have lived that cycle and know which cuts kill a piece of work, and which no viewer will ever spot.",
  },
  {
    no: "06",
    discipline: "Production",
    body: "Producers who have made exactly this, at exactly this scale.",
    who: "Line producers, EPs and post supervisors, sorted by what they have delivered: the market, the format, the scale, the budget band. Nobody learns the São Paulo rainy season on your shoot.",
  },
  {
    no: "07",
    discipline: "HR",
    body: "Hiring, structure and pay for the people the work depends on.",
    who: "Team builders from inside production who have drawn the org chart and sat through the exit interviews. An empty senior producer chair has a monthly cost; they can quote it.",
  },
  {
    no: "08",
    discipline: "Venture",
    body: "New studios, new divisions, sometimes a whole new company.",
    who: "Signed the lease, made payroll in the thin months, sold or shut it down. Founders and operators. A client building something new hears it from people who have carried that risk.",
  },
  {
    no: "09",
    discipline: "Media",
    body: "Formats, durations, versions: what the channels will demand of the job.",
    who: "Media planners who work backwards from the buy, so the nine-by-sixteen cut is in the boards and the budget, never a surprise in post.",
  },
  {
    no: "10",
    discipline: "Talent Partnerships",
    body: "Deals between brands and talent, across entertainment, culture and sport.",
    who: "Dealmakers who have sat on both sides of the table, brand and talent. Exceptional talent is a market like any other: they know which names are free in the window, what an association is worth, and where a fee stops being sensible.",
  },
  {
    no: "11",
    discipline: "Legal",
    body: "The paper the work is made on: rights, contracts, IP.",
    who: "Production lawyers, not general counsel on loan: usage, options and talent terms, drafted and later defended. They can price a two-year, three-market buyout before the agent names a figure.",
  },
  {
    no: "12",
    discipline: "Sustainability",
    body: "A standard you can produce to, and prove.",
    who: "A footprint report that survives an audit, number by number. Measurement people who have taken carbon out of shoots: generators, flights, set builds. They will tell you which productions are greener and which merely say so.",
  },
] as const;
