// MARK: - Helper Functions

/**
 * Determines the font size for a blog post title based on its length.
 *
 * @param {string} title - The blog post title.
 * @return {number} `32` for titles longer than 110 characters, `40` for titles longer than 70 characters, or `56` otherwise.
 */
export function getFontSizeForTitle(title) {
  const baseFontSize = 56;
  if (title.length > 110) return 32;
  if (title.length > 70) return 40;
  return baseFontSize;
}

/**
 * Loads a character subset of a font from Google Fonts.
 *
 * @param {string} font - The font family and weight specification.
 * @param {string} text - The characters to include in the font subset.
 * @return {ArrayBuffer} The loaded font binary data.
 * @throws {Error} If the font resource cannot be loaded successfully.
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
 * Creates the layout for an OpenGraph image.
 *
 * @param {Object} params - Content and styling values for the image.
 * @param {string} params.postTitle - Post title to display.
 * @param {number} params.fontSize - Title font size.
 * @param {string} params.author - Author name to display.
 * @param {string} params.profileImg - Profile image URL.
 * @param {string} params.site - Site name or domain to display.
 * @returns {import("react").JSX.Element} The OpenGraph image layout.
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
