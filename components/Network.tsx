import { Reveal } from "@/components/Reveal";
import { partnerNetwork } from "@/lib/site";

// The extended network as a static index: a headline count, one line, then the
// twelve disciplines as a plain grid — number · name · what they do. The old
// click-to-open panels are gone; they added nothing the line doesn't say, and
// the flat index reads more in line with the rest of the site.
export function Network() {
  return (
    <div className="net">
      <div className="net-head">
        <span className="net-stat">30+</span>
        <p className="net-lead">
          Trusted specialists across twelve disciplines, on call the moment a
          project needs them.
        </p>
      </div>
      <Reveal className="netgrid2" stagger>
        {partnerNetwork.map((p) => (
          <div className="ncell" key={p.no}>
            <span className="ncell-no">{p.no}</span>
            <h3 className="ncell-t">{p.discipline}</h3>
            <p className="ncell-b">{p.body}</p>
          </div>
        ))}
      </Reveal>
    </div>
  );
}
