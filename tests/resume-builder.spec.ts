import { expect, test } from "@playwright/test";
import { POST } from "../src/app/api/generate-resume/route";
import { createResumeDocx } from "../src/lib/docx-builder";

test.describe("Resume Builder Page E2E Tests", () => {
  test("should render the Resume Builder page with header, input field, and sample JDs", async ({
    page,
  }) => {
    // Navigate to the resume builder page with relative URL
    await page.goto("/resume-builder");

    // Check title/header elements are present
    await expect(page.locator("h1")).toContainText(/ATS Resume Generator/i);

    // Verify presence of sample JD buttons
    const sampleJdButtons = page.locator(
      "button:has-text('Senior Fullstack Engineer')",
    );
    await expect(sampleJdButtons).toBeVisible();

    // Verify API key input field is present
    const keyField = page.locator("input[placeholder*='AIzaSy']");
    await expect(keyField).toBeVisible();

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

test.describe("docx-builder Unit Tests", () => {
  test("createResumeDocx should successfully parse structured schema and create binary buffer", async () => {
    const mockData = {
      header: {
        fullName: "Test User",
        title: "Test Fullstack Engineer",
        contact: "test@domain.com | +123456",
      },
      summary: "Passionate developer building things.",
      technicalSkills: {
        languagesAndFrameworks: "JS, TS, React",
        toolsAndPlatforms: "Docker, AWS",
        methodologiesAndPractices: "Agile, TDD",
      },
      workExperience: [
        {
          role: "Developer",
          company: "Acme",
          period: "2024-Present",
          bullets: ["Engineered highly scalable microservices."],
        },
      ],
      projects: [
        {
          name: "Project Acme",
          techStack: "React, Node",
          bullets: ["Successfully deployed application."],
        },
      ],
      education: [
        {
          degree: "B.S. Computer Science",
          institution: "Test University",
          year: "2024",
        },
      ],
    };

    const buffer = await createResumeDocx(mockData, { compact: true });
    expect(Buffer.isBuffer(buffer)).toBe(true);
    expect(buffer.length).toBeGreaterThan(0);
  });

  test("createResumeDocx should gracefully handle empty or missing sections", async () => {
    const mockMinimalData = {
      header: {
        fullName: "Minimalist Name",
      },
    };

    const buffer = await createResumeDocx(mockMinimalData, { compact: false });
    expect(Buffer.isBuffer(buffer)).toBe(true);
    expect(buffer.length).toBeGreaterThan(0);
  });
});

test.describe("generate-resume API Unit Tests", () => {
  test("POST /api/generate-resume should return 400 Bad Request when x-gemini-api-key header is missing", async ({
    request,
  }) => {
    const response = await request.post("/api/generate-resume", {
      data: {
        jobDescription: "React engineer needed.",
      },
    });

    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.error).toContain("Gemini API Key is missing");
  });

  test("POST /api/generate-resume should return 400 Bad Request when jobDescription payload is missing", async ({
    request,
  }) => {
    const response = await request.post("/api/generate-resume", {
      headers: {
        "x-gemini-api-key": "test-key",
      },
      data: {},
    });

    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.error).toContain("Job description is required");
  });

  test("POST /api/generate-resume should return 500 when SYSTEM_PROMPT or MASTER_PROFILE_JSON env variable is missing", async () => {
    const originalPrompt = process.env.SYSTEM_PROMPT;
    const originalProfile = process.env.MASTER_PROFILE_JSON;

    process.env.SYSTEM_PROMPT = "";
    process.env.MASTER_PROFILE_JSON = "";

    try {
      const req = new Request("http://localhost/api/generate-resume", {
        method: "POST",
        headers: {
          "x-gemini-api-key": "test-key",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobDescription: "React developer.",
        }),
      });

      const res = await POST(req);
      expect(res.status).toBe(500);

      const body = await res.json();
      expect(body.error).toContain("Server configuration error");
    } finally {
      process.env.SYSTEM_PROMPT = originalPrompt;
      process.env.MASTER_PROFILE_JSON = originalProfile;
    }
  });
});
