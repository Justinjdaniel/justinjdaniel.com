import { ImageResponse } from "next/og";

async function loadGoogleFont(font, text) {
  const url = `https://fonts.googleapis.com/css2?family=${font}&text=${encodeURIComponent(
    text,
  )}`;
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

  throw new Error("failed to load font data");
}

export async function GET() {
  const text = "Justin J Daniel";
  const description =
    "Full-stack developer passionate about creating impactful web experiences";

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#000",
        background: "linear-gradient(180deg, #0A0A0A 0%, #1A1A1A 100%)",
        // backgroundImage: 'url(https://justinjdaniel.com/images/og-bg.png)',
        padding: "40px",
        position: "relative",
        // borderRadius: '24px',
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
            backgroundImage:
              "url(https://avatars.githubusercontent.com/u/62233773)",
          }}
        >
          {/* <Image src='/images/icon.png' alt='Profile' width={120} height={120} /> */}
        </div>

        <h1
          style={{
            fontSize: "48px",
            fontWeight: "bold",
            color: "#FFFFFF",
            margin: 0,
            textAlign: "center",
            fontFamily: "Google Sans Display",
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
            fontFamily: "JetBrains Mono",
          }}
        >
          {description}
        </p>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Google Sans Display",
          data: await loadGoogleFont("Google+Sans+Display", text),
          style: "bold",
        },
        {
          name: "JetBrains Mono",
          data: await loadGoogleFont("JetBrains+Mono", description),
          style: "normal",
        },
      ],
    },
  );
}
