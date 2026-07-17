import fs from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";

/**
 * Retrieves project metadata from the local JSON data file.
 * @return {NextResponse} A JSON response containing the project metadata or an error message with HTTP status 500.
 */
export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "src/lib/data/projects.json");
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const projects = JSON.parse(fileContent);
    return NextResponse.json(projects);
  } catch (error) {
    console.error("Failed to read projects metadata:", error);
    return NextResponse.json(
      { error: "Failed to read projects metadata" },
      { status: 500 },
    );
  }
}
