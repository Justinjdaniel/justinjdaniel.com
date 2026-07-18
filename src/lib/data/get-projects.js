/**
 * Utility to fetch projects metadata.
 * Uses the native fetch API with stale-while-revalidate caching (revalidate: 3600).
 * Falls back to reading the projects.json file directly during build time (prerendering)
 * or when the local dev/prod server is not yet running on port 3000.
 *
 * @returns {Promise<Array<Object>>} List of projects.
 */
export async function getProjects() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  try {
    const res = await fetch(`${baseUrl}/api/projects`, {
      next: { revalidate: 3600 },
    });

    if (res.ok) {
      return await res.json();
    }
    console.warn(
      `Fetch to local api/projects returned status ${res.status}. Falling back to direct file read.`,
    );
  } catch (error) {
    // Expected during static pre-rendering of pages at build-time if local server isn't running
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "Fetch to local api/projects failed. Falling back to direct file read.",
        error.message,
      );
    }
  }

  // Fallback: Read directly from the projects.json file to ensure robust Next.js builds.
  try {
    const fs = await import("node:fs");
    const path = await import("node:path");
    const filePath = path.join(process.cwd(), "src/lib/data/projects.json");
    const fileContent = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(fileContent);
  } catch (err) {
    console.error("Critical: Failed to read projects fallback file", err);
    return [];
  }
}
