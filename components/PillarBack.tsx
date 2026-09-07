import { pillarBacks } from "@/lib/site";

// Placeholder capabilities for the pillars whose real copy hasn't landed yet.
// Same shape and length as the real lists so every card is the same height and
// the grid stays even; swap each pillar into pillarBacks as its copy arrives.
const LOREM_CAPS = [
  {
    t: "Lorem Ipsum Dolor",
    d: "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
  },
  {
    t: "Ut Enim Ad Minim",
    d: "Veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea.",
  },
  {
    t: "Duis Aute Irure",
    d: "Dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.",
  },
  {
    t: "Excepteur Sint Occaecat",
    d: "Cupidatat non proident sunt in culpa qui officia deserunt mollit anim.",
  },
  {
    t: "Perspiciatis Unde Omnis",
    d: "Iste natus error sit voluptatem accusantium doloremque laudantium totam.",
  },
  {
    t: "Nemo Enim Ipsam",
    d: "Voluptatem quia voluptas sit aspernatur aut odit aut fugit sed quia.",
  },
];

// The back face of a pillar flip card: the capabilities list where we have it,
// otherwise a matching-length placeholder. One place so home and /services stay
// in step as real copy replaces the lorem.
export function PillarBack({ title }: { title: string }) {
  const caps = pillarBacks[title] ?? LOREM_CAPS;
  return (
    <ul className="cap-list">
      {caps.map((c) => (
        <li key={c.t}>
          <span className="cap-t">{c.t}</span>
          <span className="cap-d">{c.d}</span>
        </li>
      ))}
    </ul>
  );
}
