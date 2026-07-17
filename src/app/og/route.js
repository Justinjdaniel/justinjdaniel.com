// MARK: - Imports
import { ImageResponse } from "next/og";
import {
  getFontSizeForTitle,
  getOgImageTemplate,
  loadGoogleFont,
} from "./og-helper";

// MARK: - Config & Constants
export const runtime = "edge";

// MARK: - Handlers & Logic

/**
 * Generates an OpenGraph preview image for a blog post.
 *
 * @param {Request} req - Request containing the optional `title` query parameter.
 * @return {Promise<ImageResponse>} An OpenGraph image response rendered at 1200 by 630 pixels.
 */
export async function GET(req) {
  // Get blog post title from query parameter
  const { searchParams } = new URL(req.url);
  const postTitle = searchParams.get("title") || "Untitled Blog Post";

  // Branding config
  const author = "Justin J Daniel";
  const profileImg =
    "https://avatars.githubusercontent.com/u/62233773?s=120&v=4";
  const site = "justinjdaniel.com";

  // Dynamically adjust font size for long titles
  const fontSize = getFontSizeForTitle(postTitle);

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
    getOgImageTemplate({
      postTitle,
      fontSize,
      author,
      profileImg,
      site,
    }),
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
