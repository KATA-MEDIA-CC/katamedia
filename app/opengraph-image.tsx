import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.descriptor}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Load a Google font as TTF (legacy UA makes Google serve truetype, which
// Satori can use). Returns null on any failure so the card still renders.
async function loadFont(weight: number): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@${weight}`,
      { headers: { "User-Agent": "Mozilla/5.0 (Windows NT 6.1)" } }
    ).then((r) => r.text());
    const url = css.match(
      /src: url\((.+?)\) format\('(?:opentype|truetype)'\)/
    )?.[1];
    if (!url) return null;
    return await fetch(url).then((r) => r.arrayBuffer());
  } catch {
    return null;
  }
}

export default async function OpengraphImage() {
  const [regular, bold] = await Promise.all([loadFont(600), loadFont(700)]);
  const fonts =
    regular && bold
      ? [
          { name: "Schibsted Grotesk", data: regular, weight: 600 as const, style: "normal" as const },
          { name: "Schibsted Grotesk", data: bold, weight: 700 as const, style: "normal" as const },
        ]
      : undefined;
  const ff = fonts ? "Schibsted Grotesk" : undefined;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#1a1813",
          padding: "70px 84px",
          position: "relative",
          fontFamily: ff,
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -40,
            bottom: -170,
            fontSize: 560,
            fontWeight: 700,
            letterSpacing: "-0.04em",
            color: "rgba(246,242,232,0.05)",
            display: "flex",
          }}
        >
          k
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 22,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(246,242,232,0.55)",
            fontWeight: 600,
          }}
        >
          <div style={{ display: "flex" }}>Independent Production Advisory</div>
          <div style={{ display: "flex" }}>{site.domain}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 300,
              fontWeight: 600,
              letterSpacing: "0.12em",
              color: "#f6f2e8",
              lineHeight: 1,
              textTransform: "uppercase",
            }}
          >
            kata
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 30,
              fontWeight: 600,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#c0532c",
              marginTop: 26,
            }}
          >
            Knowledge applied to action
          </div>
        </div>
      </div>
    ),
    { ...size, ...(fonts ? { fonts } : {}) }
  );
}
