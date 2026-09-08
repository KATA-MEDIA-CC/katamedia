// ─────────────────────────────────────────────────────────────────────────
// Central site configuration.
// Everything content- or brand-specific lives here so it can be changed in
// one place — domain, contact details, navigation, taglines.
// ─────────────────────────────────────────────────────────────────────────

import type { Metadata } from "next";

export const site = {
  name: "Kata",
  wordmark: "kata",
  domain: "bureau-kata.com",
  url: "https://bureau-kata.com",
  tagline: "Knowledge applied to action",
  // Shared alias to all three founders. Enquiries land here, and it's the
  // fallback shown if the form can't send. Founders' direct addresses are on
  // the founders list below.
  email: "hello@bureau-kata.com",
  // TEMPORARY (domain migration): the Resend "from" address. Sending needs a
  // Resend-verified domain, and bureau-kata.com isn't verified there yet, so
  // mail still SENDS from the verified katamedia.cc address while everything the
  // visitor sees — plus reply-to and the internal notification target — is
  // already bureau-kata.com. Once bureau-kata.com is verified in Resend, set
  // this to site.email (or delete it) and this split disappears.
  mailFrom: "hello@katamedia.cc",
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
    "We design and build how brands and agencies make content: production strategy, capability, AI and cost. We don't run your productions. We design the system they run in. Independently.",
  // The hero's displayed subline — audience and offer, one breath. `short`
  // above stays the meta description and carries the SEO keywords.
  // "Independently led." was removed here (CR feedback, Jul 2026): it sat
  // two lines above the cred band, which makes the same claim stronger and
  // with proof. Independence now appears exactly twice on the home page —
  // cred band (claim + proof) and footer (closing) — each with its own job.
  // Also settled: no "advisory" in this line, ever — advisers recommend
  // from outside, we build. The keywords live in the meta description.
  sub: "We help Brands and Agencies commission smarter, build the right production structure, and control what it actually costs.",
  belief: "We sit beside the decision, never above the process and never inside the margin.",
  booking: "Now booking · 2026",
  // Company page handle — CONFIRM the slug before publishing.
  linkedin: "https://www.linkedin.com/company/bureau-kata/",
} as const;

// The cred band — one slim strip directly under the home hero.
// Founder feedback (Jul 2026): the pedigree and the independence claim are the
// reason anyone takes the 45-minute call, so they cannot live only on /team.
// Wording note: the word "kickback" is banned (Cornelius — negatively loaded).
// The independence claim was removed from the cred band and footer (Sep 2026);
// independence now lives only in the descriptor and meta copy.
// 45+ = 15 (Justin) + 20 (Cornelius, corrected from 25 — CR, Jul 2026) +
// 12 (Jankel) = 47, rounded down on purpose so the number can never be
// accused of inflation.
export const cred = {
  years: "45+ years of production leadership",
  houses: [
    "The Mill",
    "Stink",
    "Psyop",
    "Markenfilm",
    "Jung von Matt",
    "Kolle Rebbe",
    "DDB",
  ],
} as const;

// Placeholder copy for the back of the flip cards until the real copy lands.
export const flipBack =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, quis nostrud exercitation.";

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
// Display order (founder request, Sep 2026): Cornelius · Justin · Jankel.
// FACE_X in Founders.tsx is indexed by this order — keep the two in step.
export const founders = [
  {
    name: "Cornelius Roenz",
    role: "Strategy, production controlling and executive production",
    email: "cornelius@bureau-kata.com",
    card: "Twenty years at Markenfilm, seven of them as Managing Director.",
    notes: [
      "Twenty years at Markenfilm, seven of them as Managing Director. Ran the company without leaving the work: pitches, directors, production negotiations, and the number on set.",
      "Production leader and controlling specialist with deep market knowledge across German and European TVC, content, and campaign production.",
      "Has built, assessed, and managed production budgets at every scale, from focused social campaigns to complex international shoots. Knows how ambitious creative work is costed, where the money shows up on screen, and when a number doesn't hold up.",
      "Specialist in production economics and the German market. Its rates, its production companies, its directors, and the dynamics that shape it.",
    ],
    photo: "/team/cornelius.png",
    ar: 1.5071, // 1706 × 1132 (new portrait, Sep 2026)
    k: 0.4, // re-measured against the new file
    e: 0.247, // eyes sit high in the new frame
  },
  {
    name: "Justin Stiebel",
    role: "Strategy, organisational design and advisory",
    email: "justin@bureau-kata.com",
    // One line for the home founder card — the pedigree, nothing else.
    card: "Fifteen years leading VFX and production companies. The Mill, Stink, Psyop.",
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
    name: "Jankel Huppertz",
    role: "Production leadership, operations and advisory",
    email: "jankel@bureau-kata.com",
    card: "Twelve years running production at Jung von Matt, across formats and scales.",
    notes: [
      "Twelve years at Jung von Matt, running production across formats and scales.",
      "Production leader with deep experience across agency production. Understands how TVC, content, and campaign production works, from idea to execution.",
      "Has built and managed production across formats and scales, from agile content to large international campaigns. Knows how to run complex productions, align teams, and deliver against creative and commercial demands.",
      "Specialist in production structures, processes, and budgets, and where value is created or lost.",
    ],
    photo: "/team/jankel.png",
    ar: 1.5, // 1536 × 1024 (new portrait, Sep 2026)
    k: 0.83, // tight leaning-in close-up — sets the head size for the whole row
    e: 0.43, // eyes ~0.43 down the new frame
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
// `detail` is ONE prose paragraph on /services. It used to be a bullet list
// (`items`) — removed on founder feedback: bullet runs read as machine-written
// ("Claude Automatisierung Styles", Cornelius), and the CI voice is short
// declaratives, not lists. Keep it prose.
export const pillars = [
  {
    no: "01",
    icon: "strategy" as const,
    slug: "strategic-advisory",
    title: "Strategic Advisory",
    homeLead: "How content gets commissioned, planned and made at scale. Decided, not inherited.",
    lead: "Shaping how brands and agencies commission and plan content at scale.",
    detail:
      "What you make, where, and with whom. Rosters and directors chosen on judgement, not on relationships. Emerging formats weighed before the market decides for you, from sustainable production to international structures.",
  },
  {
    no: "02",
    icon: "organisation" as const,
    slug: "organisational-setup",
    title: "Organisational Setup & Studio Builds",
    homeLead: "The capability your organisation needs, designed from the ground up or rebuilt from inside.",
    lead: "Building the production capability organisations need, from scratch or from inside.",
    detail:
      "In-house departments designed before anyone is hired. Agency production builds that outlast the people who start them. The technology stack selected while there is still nothing to migrate, through to VFX, post and AI studio builds.",
  },
  {
    no: "03",
    icon: "ai" as const,
    slug: "ai-integration",
    title: "AI Integration & Transformation",
    homeLead: "AI in the workflow, under real governance. Deployed, not piloted.",
    lead: "AI in production, deployed. Not piloted.",
    detail:
      "Readiness audited across the six dimensions. Tools selected on evidence, not on demos. Workflows rewired with governance, ethics and training that hold after we leave.",
  },
  {
    no: "04",
    icon: "controlling" as const,
    slug: "production-controlling",
    title: "Production Controlling",
    homeLead: "Cost is where strategy shows up. We read the numbers structurally: what carries load, what is padding, what is about to fail.",
    lead: "Cost is where strategy shows up. Read by people who know what things should cost.",
    detail:
      "Budgets built to be read, not just approved. Variance surfaced during production, not after. Rates, buyouts and post-production cost benchmarked and negotiated from inside knowledge of the market.",
  },
] as const;

// The back of each pillar flip card: a capabilities list, keyed by pillar
// title. Pillars without an entry here fall back to placeholder copy until
// their real capabilities land.
export const pillarBacks: Record<string, { t: string; d: string }[]> = {
  "Strategic Advisory": [
    {
      t: "Production Strategy",
      d: "Commissioning principles, partner frameworks and budget benchmarks.",
    },
    {
      t: "Production Reality Check",
      d: "Bringing production intelligence into the creative process early, without compromising creativity.",
    },
    {
      t: "Content Planning at Scale",
      d: "Structuring volume, bundling and capacity across the year.",
    },
    {
      t: "Roster & Director Advisory",
      d: "Independent recommendations on creative fit, format and budget.",
    },
    {
      t: "Emerging Format Strategy",
      d: "Production pipelines for social-first, micro drama and AI-generated content.",
    },
    {
      t: "Sustainable Production",
      d: "Carbon budgeting, supplier selection and production data.",
    },
  ],
  "Organisational Setup & Studio Builds": [
    {
      t: "Capability Assessment",
      d: "What belongs in-house, what stays external, and why.",
    },
    {
      t: "In-House Studio Build",
      d: "Brand-side production units built from scratch or from existing teams.",
    },
    {
      t: "Agency Production Setup",
      d: "Production capability inside agencies, from structure to staffing.",
    },
    {
      t: "Operating Model & Process Design",
      d: "Roles, approvals and workflows.",
    },
    {
      t: "Post & VFX Capability",
      d: "Build, partner or buy external.",
    },
    {
      t: "Handover & Interim Leadership",
      d: "Running the setup until permanent leadership is in place.",
    },
  ],
  "AI Integration & Transformation": [
    {
      t: "AI Workflow Mapping",
      d: "Where AI genuinely speeds up or improves production, and where it doesn’t.",
    },
    {
      t: "Tool & Vendor Evaluation",
      d: "Independent assessment of AI production tools.",
    },
    {
      t: "Governance & Rights Framework",
      d: "Sign-off structures, usage rights and disclosure requirements for AI-generated content.",
    },
    {
      t: "Human-in-the-Loop Design",
      d: "Defining what stays human.",
    },
    {
      t: "Pilot & Rollout Planning",
      d: "Testing AI integration on one real production before scaling.",
    },
    {
      t: "Team Enablement",
      d: "Training and documentation for the people doing the work.",
    },
  ],
  "Production Controlling": [
    {
      t: "Cost Benchmarking",
      d: "Production costs compared against real market rates.",
    },
    {
      t: "Should-Cost Analysis",
      d: "A cost estimate before the first quote arrives.",
    },
    {
      t: "Bid Validation",
      d: "Independent review of supplier quotes before they are signed.",
    },
    {
      t: "Live Cost Tracking",
      d: "Cost reporting throughout the production.",
    },
    {
      t: "Buyout & Usage Rights",
      d: "Term, territory and renewals, priced against actual use.",
    },
    {
      t: "Invoice Reconciliation",
      d: "Final costs checked against what was scoped and quoted.",
    },
  ],
};

// How we create value — three points, shown between the hero and What we do.
export const valuePoints = [
  {
    t: "Smarter commissioning",
    d: "We tighten how content gets briefed and commissioned, without slowing your team down.",
  },
  {
    t: "The right production structure",
    d: "We build or rebuild your production setup, without disrupting what’s already delivering.",
  },
  {
    t: "Full process transparency",
    d: "A full view across your production, from process to cost, without turning it into a finger-pointing exercise that may hurt the work.",
  },
] as const;

// How we engage — the three low-commitment ways a relationship starts.
export const entryPoints = [
  {
    no: "01",
    title: "Audit",
    icon: "audit",
    meta: "2–4 weeks · fixed fee",
    // No savings percentage here — ever (CR, Jul 2026). A number we cannot
    // yet evidence is exactly what a procurement reader is trained to
    // distrust. Experience (rates we negotiated ourselves) and mechanism
    // (line by line) carry more than an unproven percentage.
    body: "Your production setup: mapped and scored across all six dimensions of the Approach, against rates we have negotiated ourselves. Where cost leaks, you see it line by line.",
  },
  {
    no: "02",
    title: "Workshop",
    icon: "workshop",
    meta: "1–2 days · fixed fee",
    body: "One topic (AI readiness, production strategy or process), worked through with your team, ending in a written deliverable.",
  },
  {
    no: "03",
    title: "Pilot",
    icon: "pilot",
    meta: "4–8 weeks · scoped fee",
    body: "A pressing project, run end to end with us embedded, from brief through to handover.",
  },
] as const;

// How we work — the principles that sit above the six dimensions on the
// approach: the posture Kata brings to every engagement.
// Descriptions transcribed from the colleague's approved rework (Sep 2026);
// a single *pivot* word per line renders as the clay accent (see components/
// Pivot.tsx). Proofread against the source file — read off the mockup image.
export const approachPrinciples = [
  { t: "Integrated", d: "One team, one view across brand, agency and *production*." },
  { t: "Collaborative", d: "Built with your *team* in the room, shaped together from day one." },
  { t: "Unbiased & transparent", d: "Full independence from the companies, directors and agencies we *recommend*." },
  { t: "Data-driven", d: "Every recommendation traces back to a number you can *check*, benchmarked against real market rates." },
  { t: "Impact-driven", d: "Every engagement ends with something you can *act* on." },
  { t: "Experienced", d: "45+ years of production leadership, built at The Mill, Stink, Psyop, Markenfilm and Jung von Matt." },
  { t: "Innovative", d: "Production pipelines built for what's *next*: social-first, micro drama, AI-generated content." },
] as const;

// The Kata Approach: six dimensions.
// `icon` keys map to DimensionIcon in components/Icons.tsx — the home page
// shows the six as icon + label only; /approach carries the full bodies.
// Bodies transcribed from the colleague's approved rework (Sep 2026); one
// *pivot* word per body is the clay accent. Proofread against the source.
export const dimensions = [
  {
    no: "01",
    icon: "workflow" as const,
    title: "Workflow & Process",
    body: "Most waste is invisible until someone maps it. We show you exactly where your *time* and budget leak between brief and delivery.",
  },
  {
    no: "02",
    icon: "systems" as const,
    title: "Technology & Systems",
    body: "Is your tech stack earning its budget, or just adding *complexity*? We assess stack, integration and adoption to give you a straight answer.",
  },
  {
    no: "03",
    icon: "budget" as const,
    title: "Budget & Resource",
    body: "Budget and reality rarely match by the end of a production. We examine structure, cost variance and governance to show you exactly where they *diverge*.",
  },
  {
    no: "04",
    icon: "team" as const,
    title: "Team & Capability",
    body: "Who decides what, and what happens when someone *leaves*? We map roles, decision rights and capability coverage to close the key-person risk.",
  },
  {
    no: "05",
    icon: "quality" as const,
    title: "Pipeline & Quality",
    body: "Quality is made in specific places, and it erodes in specific places too. We trace content from brief to archive to find exactly where *rework* creeps in.",
  },
  {
    no: "06",
    icon: "vendor" as const,
    title: "Vendor & Partner",
    body: "Vendor rosters carry real variation in risk and value. We segment yours and assess contract structure to show which partners actually *earn* their place.",
  },
] as const;

// References / client logos — INTENTIONALLY EMPTY.
// Founder feedback (Jahnke): after the founders themselves, shown work is the
// second-strongest trust point — "machen wir dann sobald wir können". The
// moment there is something Kata may show, fill this in and render it (a slim
// logo strip under "What we do" is the intended slot). Until then nothing
// renders: an empty "clients" section is worse than none.
// export const references = [
//   { name: "Client name", logo: "/refs/client.svg", quote: "", person: "" },
// ] as const;

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
    who: "Finance leads who have run the numbers inside production and studio businesses. They build the business case for a studio that does not exist yet: cost model, rate card, chargeback structure. The last two decide whether marketing uses the studio it paid for.",
  },
  {
    no: "02",
    discipline: "Strategy",
    body: "Which capability is worth owning, and which is worth renting forever.",
    who: "Strategists from both brand and agency side. They settle make-or-buy: what a company produces itself, what it keeps buying, what it stops making entirely. Every build stands on that decision, so it gets made first.",
  },
  {
    no: "03",
    discipline: "Technology",
    body: "The stack a new studio runs on, picked while there is still nothing to migrate.",
    who: "Systems architects who have specified production pipelines from an empty floor. They select the stack before there is anything to migrate: storage, asset management, review, archive. Each choice is weighed by what it costs to reverse.",
  },
  {
    no: "04",
    discipline: "AI",
    body: "AI in the workflow: what goes in, where, and under whose rules.",
    who: "Practitioners who have put AI into live pipelines, not demos. They select tools on evidence, rewire the workflow, and write the governance and training for the week something breaks and the team reaches for the old way.",
  },
  {
    no: "05",
    discipline: "Creative",
    body: "Creative direction inside the building, on work the brand makes itself.",
    who: "Creative directors who have led in-house studios. They set the quality bar for work a brand makes itself, define the hiring profile against it, and call the slide early, before the studio becomes a versioning department.",
  },
  {
    no: "06",
    discipline: "Production",
    body: "Producers who start a studio, and the department still standing when they leave.",
    who: "Senior executive producers who have started studios and production departments. They build the operating layer: staffing rota, escalation paths, the handbook, the second year planned during the first. The department is designed to run without its founders.",
  },
  {
    no: "07",
    discipline: "HR",
    body: "The org chart for a team nobody has hired yet.",
    who: "Team builders who have hired inside production companies and agencies. They set the org chart, pay bands and titles for roles that marketing frameworks cannot price, and take that case to the remuneration committee.",
  },
  {
    no: "08",
    discipline: "Venture",
    body: "New studios, new divisions, sometimes a whole new company.",
    who: "Founders and operators who have started, sold and closed companies. They write the operating plan for a new studio or division: payroll, runway, and a bad quarter already costed, because theirs had one.",
  },
  {
    no: "09",
    discipline: "Media",
    body: "What the channels will demand of the work, and how much of it there is.",
    who: "Media planners who work backwards from the buy. They set the numbers a studio is sized against, before the floor plan is drawn: assets per year, at what turnaround. Wrong numbers mean an idle studio by June, or outsourcing again.",
  },
  {
    no: "10",
    discipline: "Talent Partnerships",
    body: "Brands and talent, across entertainment, culture and sport, on terms that get reused.",
    who: "Negotiators who have closed talent deals from both sides of the table. They put brand and talent on terms built for reuse: a fee benchmark, a rights window, a template. The next deal starts from a number, not a phone call.",
  },
  {
    no: "11",
    discipline: "Legal",
    body: "Rights, contracts and IP, from the moment a brand starts owning its own work.",
    who: "Production lawyers, not general counsel on loan. They build the rights framework and the contract templates a studio signs a thousand times, starting with the first piece of work a brand owns outright.",
  },
  {
    no: "12",
    discipline: "Sustainability",
    body: "Carbon counted on the job itself, and a number that holds up.",
    who: "Measurement specialists who have taken carbon out of real shoots: generators, travel, post. They set the baseline first, then wire the counting into the workflow, so the number arrives with the delivery and survives an audit.",
  },
] as const;
