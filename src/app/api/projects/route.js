import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "src/lib/data/projects.json");
    const fileContent = await readFile(filePath, "utf-8");
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
