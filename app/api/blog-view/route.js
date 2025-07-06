import { NextResponse } from "next/server";
import {
  getViewCount,
  incrementViewCount,
} from "@/_db/queries/blog-post-views";

// POST: increment view count ̰
export async function POST(request) {
  const { slug } = await request.json();
  if (!slug)
    return NextResponse.json({ error: "Missing slug" }, { status: 400 });
  await incrementViewCount(slug);
  const count = await getViewCount(slug);
  return NextResponse.json({ viewCount: count });
}

// GET: get view count
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  if (!slug)
    return NextResponse.json({ error: "Missing slug" }, { status: 400 });
  const count = await getViewCount(slug);
  return NextResponse.json({ viewCount: count });
}
