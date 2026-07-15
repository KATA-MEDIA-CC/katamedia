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
      "Fifteen years leading VFX, production and animation companies. The Mill, Stink, Psyop. Three companies built from scratch. Ten years in the UK.",
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
      "Twenty-five years at Markenfilm, seven of them as Managing Director.",
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
      "Twelve years at Jung von Matt, running production across formats and scales.",
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

// The four service pillars (from the pitch: Four pillars. One partner.)
// Ordered as the arc we actually work in: design the system, build it,
// modernise it, then run it with rigour. Controlling sits last deliberately:
// it is the proof of discipline, not the identity. The numbers are read as a
// hierarchy claim, so this order IS the positioning: change it with care.
//
// Two descriptions per pillar, because the pages do different jobs:
//   homeLead  the home grid, where the pillar is a claim
//   lead      /services, where it introduces the detail beneath it
// `items` renders as bullets on /services, which shows the first THREE only.
export const pillars = [
  {
    no: "01",
    icon: "strategy" as const,
    title: "Strategic Advisory",
    homeLead: "How content gets commissioned, planned and made at scale. Decided, not inherited.",
    lead: "Shaping how brands and agencies commission and plan content at scale.",
    items: [
      "Production strategy: what you make, where, and with whom",
      "Rosters and directors, chosen on judgement, not on relationships",
      "Emerging formats, weighed before the market decides for you",
      "Sustainable production",
      "International structures",
    ],
  },
  {
    no: "02",
    icon: "organisation" as const,
    title: "Organisational Setup & Studio Builds",
    homeLead: "The capability your organisation needs, designed from the ground up or rebuilt from inside.",
    lead: "Building the production capability organisations need, from scratch or from inside.",
    items: [
      "In-house departments, designed before anyone is hired",
      "Agency production builds that outlast the people who start them",
      "The technology stack, selected while there is still nothing to migrate",
      "VFX · Post · AI studio builds",
      "Production talent advisory",
    ],
  },
  {
    no: "03",
    icon: "ai" as const,
    title: "AI Integration & Transformation",
    homeLead: "AI in the workflow, under real governance. Deployed, not piloted.",
    lead: "AI in production, deployed. Not piloted.",
    items: [
      "Readiness, audited across the six dimensions",
      "Tools selected on evidence, not on demos",
      "Workflows rewired, with governance and training that hold",
      "Training & upskilling",
      "Ethics & governance",
    ],
  },
  {
    no: "04",
    icon: "controlling" as const,
    title: "Production Controlling",
    homeLead: "Cost is where strategy shows up. We read the numbers structurally: what carries load, what is padding, what is about to fail.",
    lead: "Cost is where strategy shows up. Read by people who know what things should cost.",
    items: [
      "Budgets built to be read, not just approved",
      "Variance surfaced during production, not after",
      "Rates benchmarked and negotiated from inside knowledge of the market",
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
    body: "Your production setup: mapped, benchmarked and scored across all six dimensions of the Method. It typically surfaces 10 to 20% in recoverable cost.",
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

// The Kata Method: six dimensions.
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
    body: "The business case for a studio that does not exist yet, costed to year three.",
    who: "The board asks what an in-house studio costs and wants the number by Friday. Finance leads out of production take a quarter over it, and hand back a rate card and a chargeback model, because those two decide whether marketing uses the studio it paid for.",
  },
  {
    no: "02",
    discipline: "Strategy",
    body: "Which capability is worth owning, and which is worth renting forever.",
    who: "Client-side and agency-side strategists settle what a brand makes itself and what it stops making, and the build sits on top of that call. They hold the line afterwards, in the room where someone's team gets smaller.",
  },
  {
    no: "03",
    discipline: "Technology",
    body: "The stack a new studio runs on, picked while there is still nothing to migrate.",
    who: "Forty people, live briefs, nowhere to put the footage. Systems architects specify the stack from an empty floor, and they know which of those choices is cheap to reverse. It is never the one people worry about.",
  },
  {
    no: "04",
    discipline: "AI",
    body: "AI in the workflow: what goes in, where, and under whose rules.",
    who: "Practitioners. Each has put AI into a live pipeline and stayed for the part nobody demos: week six, when it broke and the artist quietly went back to the old way. The training and the permissions they leave behind are written for that week.",
  },
  {
    no: "05",
    discipline: "Creative",
    body: "Creative direction inside the building, on work the brand makes itself.",
    who: "Work made in-house gets quietly worse and nobody in the building says so, until it is a versioning department with a creative title on the door. The directors who have built one set the standard, then hire against it when the easy candidate is right there.",
  },
  {
    no: "06",
    discipline: "Production",
    body: "Producers who start a studio, and the department still standing when they leave.",
    who: "New studios need a rota before they need a showreel. Senior EPs build the department to outlast the people who founded it: the handbook nobody wants to write, the escalation path everyone needs at 2am, the second year planned during the first.",
  },
  {
    no: "07",
    discipline: "HR",
    body: "The org chart for a team nobody has hired yet.",
    who: "A senior producer priced against a brand's marketing bands turns the job down. Team builders from inside production reset the bands and take that to the remuneration committee. They know which title has to sit senior enough that anyone good takes the call.",
  },
  {
    no: "08",
    discipline: "Venture",
    body: "New studios, new divisions, sometimes a whole new company.",
    who: "Signed the lease, made payroll in the thin months, sold one and shut another: the plan founders and operators write for a new division has a bad quarter in it, costed, because theirs did.",
  },
  {
    no: "09",
    discipline: "Media",
    body: "What the channels will demand of the work, and how much of it there is.",
    who: "Media planners work backwards from the buy, so volume gets set before the floor plan: how many assets a year, at what turnaround. Get it wrong and the studio is idle by June, or outsourcing again.",
  },
  {
    no: "10",
    discipline: "Talent Partnerships",
    body: "Brands and talent, across entertainment, culture and sport, on terms that get reused.",
    who: "Brand side one year, talent side the next. Exceptional talent has a going rate and a window, and knowing where a fee stops making sense is most of the job. What a brand keeps is a number it can put on the next name without picking up the phone.",
  },
  {
    no: "11",
    discipline: "Legal",
    body: "Rights, contracts and IP, from the moment a brand starts owning its own work.",
    who: "Production lawyers, not general counsel on loan. They write the templates a new studio signs a thousand times.",
  },
  {
    no: "12",
    discipline: "Sustainability",
    body: "Carbon counted on the job itself, and a number that holds up.",
    who: "Measurement people who have taken carbon out of shoots, generators and travel first. Without a baseline a target is a press release, so they wire the counting into the workflow and the number lands with the delivery.",
  },
] as const;
