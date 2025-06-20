import { NextResponse } from "next/server";
import { incrementBlogViewCount } from "../../../../_db/blog-sql";

export async function POST(request, context) {
  const params = context?.params ? await context.params : {};
  const { slug } = params;
  if (!slug) {
    return NextResponse.json({ error: "Missing blog slug" }, { status: 400 });
  }
  try {
    const newCount = await incrementBlogViewCount(slug);
    return NextResponse.json({ views: newCount });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to increment view count" },
      { status: 500 },
    );
  }
}
