// MARK: - Helper Functions

/**
 * Dynamically adjusts font size based on the length of the blog post title.
 *
 * @param {string} title - The blog post title.
 * @returns {number} The calculated optimal font size.
 */
export function getFontSizeForTitle(title) {
  const baseFontSize = 56;
  if (title.length > 110) return 32;
  if (title.length > 70) return 40;
  return baseFontSize;
}

/**
 * Loads font data from Google Fonts.
 *
 * @param {string} font - The font name and weights (e.g. "Inter:wght@700").
 * @param {string} text - The subset of characters to fetch for optimization.
 * @returns {Promise<ArrayBuffer>} The loaded font binary data.
 */
export async function loadGoogleFont(font, text) {
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

/**
 * Generates the SVG/HTML layout structure for the OpenGraph image.
 *
 * @param {Object} params - Template parameters.
 * @param {string} params.postTitle - The blog post title.
 * @param {number} params.fontSize - Computed font size for title.
 * @param {string} params.author - Branding author name.
 * @param {string} params.profileImg - Profile image URL.
 * @param {string} params.site - Portfolio site domain.
 * @returns {import("react").JSX.Element} The JSX-like element layout for Og Image generation.
 */
export function getOgImageTemplate({
  postTitle,
  fontSize,
  author,
  profileImg,
  site,
}) {
  return (
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
          {/** biome-ignore lint/performance/noImgElement: intentional, <img> is used for profile picture */}
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
    </div>
  );
}
