import { expect, test } from "@playwright/test";

test.describe("Resume Builder Page Tests", () => {
  test("should render the Resume Builder page with header, input field, and sample JDs", async ({
    page,
  }) => {
    // Navigate to the resume builder page
    await page.goto("http://localhost:3000/resume-builder");

    // Check title/header elements are present
    await expect(page.locator("h1")).toContainText(/ATS Resume Generator/i);

    // Verify presence of sample JD buttons
    const sampleJdButtons = page.locator(
      "button:has-text('Senior Fullstack Engineer')",
    );
    await expect(sampleJdButtons).toBeVisible();

    // Verify passcode input field is present
    const passcodeField = page.locator("input[placeholder*='MY_APP_SECRET']");
    await expect(passcodeField).toBeVisible();

    // Verify Target JD textarea is present
    const jdTextarea = page.locator(
      "textarea[placeholder*='target job description']",
    );
    await expect(jdTextarea).toBeVisible();

    // Verify the primary action button is disabled initially
    const optimizeButton = page.locator(
      "button:has-text('Optimize & Tailor Resume')",
    );
    await expect(optimizeButton).toBeDisabled();
  });
});
