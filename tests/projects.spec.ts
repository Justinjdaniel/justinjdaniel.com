import { existsSync, renameSync } from "node:fs";
import { expect, test } from "@playwright/test";
import * as nextNavigation from "next/navigation";
import { GET } from "../src/app/api/projects/route";
import ProjectInfoPage, {
  generateStaticParams,
} from "../src/app/projects/[slug]/page";
import { getProjects } from "../src/lib/data/get-projects";

// Mock next/navigation notFound
jestMockNavigation();

function jestMockNavigation() {
  try {
    Object.defineProperty(nextNavigation, "notFound", {
      configurable: true,
      value: () => {
        throw new Error("next/navigation notFound called");
      },
    });
  } catch (_e) {
    // If next/navigation is read-only, we can catch it or mock it during imports
  }
}

test.describe("Projects API & Loader & Page Tests", () => {
  let originalFetch: typeof global.fetch;

  test.beforeEach(() => {
    originalFetch = global.fetch;
  });

  test.afterEach(() => {
    global.fetch = originalFetch;
  });

  test("GET handler returns successful JSON response", async () => {
    const response = await GET();
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(Array.isArray(data)).toBe(true);
    expect(data[0].slug).toBe("my-awesome-app");
  });

  test("GET handler handles 500 read/parse failure gracefully", async () => {
    const originalPath = "src/lib/data/projects.json";
    const tempPath = "src/lib/data/projects.temp.json";

    // Temporarily rename the projects JSON file to trigger a read failure
    if (existsSync(originalPath)) {
      renameSync(originalPath, tempPath);
    }

    try {
      const response = await GET();
      expect(response.status).toBe(500);
      const data = await response.json();
      expect(data.error).toBe("Failed to read projects metadata");
    } finally {
      // Restore file
      if (existsSync(tempPath)) {
        renameSync(tempPath, originalPath);
      }
    }
  });

  test("getProjects fallback loader behavior for non-OK fetch", async () => {
    // Mock fetch to return a 500 error
    global.fetch = async () => {
      return {
        ok: false,
        status: 500,
        json: async () => ({ error: "Internal Server Error" }),
      } as Response;
    };

    const projects = await getProjects();
    expect(Array.isArray(projects)).toBe(true);
    expect(projects[0].slug).toBe("my-awesome-app");
  });

  test("getProjects fallback loader behavior for network failure", async () => {
    // Mock fetch to simulate network error
    global.fetch = async () => {
      throw new TypeError("Failed to fetch");
    };

    const projects = await getProjects();
    expect(Array.isArray(projects)).toBe(true);
    expect(projects[0].slug).toBe("my-awesome-app");
  });

  test("getProjects fallback loader behavior for malformed-JSON response", async () => {
    // Mock fetch to return malformed json response
    global.fetch = async () => {
      return {
        ok: true,
        status: 200,
        json: async () => {
          throw new SyntaxError("Unexpected token < in JSON");
        },
      } as Response;
    };

    const projects = await getProjects();
    expect(Array.isArray(projects)).toBe(true);
    expect(projects[0].slug).toBe("my-awesome-app");
  });

  test("async page static parameter generation", async () => {
    const params = await generateStaticParams();
    expect(Array.isArray(params)).toBe(true);
    expect(params[0].slug).toBe("my-awesome-app");
  });

  test("ProjectInfoPage rendering and not-found behavior", async () => {
    // 1. Successful project rendering
    const validResult = await ProjectInfoPage({
      params: Promise.resolve({ slug: "my-awesome-app" }),
    });
    expect(validResult).toBeDefined();

    // 2. Not found slug - should reject
    await expect(
      ProjectInfoPage({
        params: Promise.resolve({ slug: "non-existent-project" }),
      }),
    ).rejects.toThrow(/(notFound|NEXT_HTTP_ERROR_FALLBACK;404)/);
  });
});
