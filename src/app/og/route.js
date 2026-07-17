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
 * GET route handler to dynamically generate OpenGraph preview images.
 * Loads optimized Google fonts and renders customized JSX layouts.
 *
 * @param {Request} req - Next.js Request object containing URL parameters.
 * @returns {Promise<ImageResponse>} Dynamic OpenGraph ImageResponse.
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
