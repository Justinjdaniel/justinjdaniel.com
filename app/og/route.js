import { ImageResponse } from "next/og";

// Helper to load font from Google Fonts
async function loadGoogleFont(font, text) {
  const url = `https://fonts.googleapis.com/css2?family=${font}&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(url)).text();
  const resource = css.match(
    /src: url\((.+)\) format\('(opentype|truetype)'\)/,
  );
  if (resource) {
    const response = await fetch(resource[1]);
    if (response.status === 200) {
      return await response.arrayBuffer();
    }
  }
  throw new Error("Failed to load font data");
}

export const runtime = "edge";

export async function GET(req) {
  // Get blog post title from query parameter
  const { searchParams } = new URL(req.url);
  const postTitle = searchParams.get("title") || "Untitled Blog Post";

  // Your branding
  const author = "Justin J Daniel";
  const profileImg =
    "https://avatars.githubusercontent.com/u/62233773?s=120&v=4";
  const site = "justinjdaniel.com";
  const bgImage = "https://justinjdaniel.com/images/og-bg.png";

  // Dynamically adjust font size for long titles (for 1200x630 images)
  const baseFontSize = 56;
  let fontSize = baseFontSize;
  if (postTitle.length > 70) fontSize = 40;
  if (postTitle.length > 110) fontSize = 32;

  // Load fonts from Google Fonts
  const interFont = await loadGoogleFont(
    "Inter:wght@700",
    postTitle + author + site,
  );
  const jetbrainsFont = await loadGoogleFont(
    "JetBrains+Mono",
    postTitle + author + site,
  );

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "stretch",
        background: "url(https://justinjdaniel.com/images/og-bg.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "#0A0A0A",
        backgroundBlendMode: "darken",
        backgroundRepeat: "no-repeat",
        position: "relative",
      }}
    >
      {/* Overlay for darken effect */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(10,10,10,0.55)",
          zIndex: 1,
        }}
      />
      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          padding: 80,
          gap: 48,
        }}
      >
        {/* Blog Title */}
        <div
          style={{
            fontFamily: "Inter",
            fontWeight: 700,
            fontSize: fontSize,
            color: "#fff",
            textAlign: "center",
            lineHeight: 1.1,
            textShadow: "0 2px 32px rgba(0,0,0,0.5)",
            maxWidth: 900,
            wordBreak: "break-word",
            whiteSpace: "normal",
            overflowWrap: "break-word",
            hyphens: "auto",
          }}
        >
          {postTitle}
        </div>

        {/* Author Row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 32,
            marginTop: 40,
          }}
        >
          <img
            src={profileImg}
            alt={author}
            width={96}
            height={96}
            style={{
              borderRadius: "50%",
              border: "4px solid #fff",
              objectFit: "cover",
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              color: "#fff",
            }}
          >
            <span
              style={{
                fontFamily: "Inter",
                fontWeight: 700,
                fontSize: 38,
                lineHeight: 1.2,
              }}
            >
              {author}
            </span>
            <span
              style={{
                fontFamily: "JetBrains Mono",
                fontSize: 28,
                color: "#ccc",
                marginTop: 4,
              }}
            >
              {site}
            </span>
          </div>
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
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
