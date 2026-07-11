import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Helper to load font from Google Fonts CSS
async function loadGoogleFont(font, text) {
  const url = `https://fonts.googleapis.com/css2?family=${font}&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(url)).text();
  const match = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/);
  if (!match)
    throw new Error("Failed to extract font URL from Google Fonts CSS");
  const fontUrl = match[1];
  const fontResponse = await fetch(fontUrl);
  if (!fontResponse.ok) throw new Error("Failed to fetch font binary");
  return await fontResponse.arrayBuffer();
}

export default async function Image() {
  const text = "Justin J Daniel";
  const description =
    "Full-stack developer passionate about creating impactful web experiences";

  // Load fonts dynamically from Google Fonts
  const interFont = await loadGoogleFont("Inter:wght@700", text);
  const jetbrainsFont = await loadGoogleFont("JetBrains+Mono", description);

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex", // REQUIRED!
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(180deg, #0A0A0A 0%, #1A1A1A 100%)",
        padding: "40px",
        border: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "24px",
        }}
      >
        <div
          style={{
            borderRadius: "16px",
            overflow: "hidden",
            width: "120px",
            height: "120px",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            marginBottom: "16px",
            display: "flex", // REQUIRED if >1 child (for future-proofing)
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/** biome-ignore lint/performance/noImgElement: intentional, <img> is used for profile picture */}
          <img
            src="https://avatars.githubusercontent.com/u/62233773?s=120&v=4"
            alt="Profile"
            width={120}
            height={120}
            style={{
              borderRadius: "16px",
              overflow: "hidden",
            }}
          />
        </div>
        <h1
          style={{
            fontSize: "48px",
            fontWeight: 700,
            color: "#FFFFFF",
            margin: 0,
            textAlign: "center",
            fontFamily: "Inter, sans-serif",
          }}
        >
          {text}
        </h1>
        <p
          style={{
            fontSize: "24px",
            color: "rgba(255, 255, 255, 0.7)",
            margin: 0,
            maxWidth: "600px",
            textAlign: "center",
            fontFamily: "JetBrains Mono, monospace",
          }}
        >
          {description}
        </p>
      </div>
    </div>,
    {
      width: size.width,
      height: size.height,
      fonts: [
        {
          name: "Inter",
          data: interFont,
          style: "normal",
          weight: 700,
        },
        {
          name: "JetBrains Mono",
          data: jetbrainsFont,
          style: "normal",
          weight: 400,
        },
      ],
    },
  );
}
