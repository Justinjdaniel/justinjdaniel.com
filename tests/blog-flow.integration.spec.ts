import { expect, test } from "@playwright/test";

// Dynamically determine BASE_URL: use Codespaces URL if present, else fallback to localhost
const getBaseUrl = () => {
  if (process.env.CODESPACE_NAME) {
    // Codespaces exposes the port as 3000-<codespace-name>.app.github.dev
    return `https://3000-${process.env.CODESPACE_NAME}.app.github.dev`;
  }
  return "http://localhost:3000";
};

const BASE_URL = getBaseUrl();

test.describe("Blog integration flow", () => {
  test("should load homepage, navigate to blogs, list blogs, and open a blog post", async ({
    page,
  }) => {
    // Arrange: Go to homepage
    await page.goto(`${BASE_URL}/`);
    await expect(page).toHaveTitle(/justin/i);

    // Act: Navigate to blog listing
    await page.goto(`${BASE_URL}/blog`);
    await expect(page.locator("h1")).toContainText(/blog/i);
    // Assert: At least one blog post is listed
    const blogLinks = page.locator('a[href^="/blog/"]');
    const blogCount = await blogLinks.count();
    expect(blogCount).toBeGreaterThan(0);

    // Act: Click the first blog post
    const firstBlog = blogLinks.first();
    const _blogUrl = await firstBlog.getAttribute("href");
    await firstBlog.click();

    // Helper to escape regex special characters in a string
    function escapeRegExp(string: string) {
      return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }

    // Assert: Blog detail page loads and URL matches the blog link
    if (_blogUrl) {
      await expect(page).toHaveURL(new RegExp(`${escapeRegExp(_blogUrl)}$`), {
        timeout: 5000,
      });
    } else {
      throw new Error("Blog link href not found");
    }
    await expect(page.locator("article")).toBeVisible();
    await expect(page.locator("h1")).not.toBeEmpty();
    // Optionally check for author, date, or content
  });
});
