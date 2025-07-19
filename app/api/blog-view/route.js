// * This file is a representation of a Next.js API route for handling blog view counts.
// * It includes functions to increment and retrieve the view count for a blog post.
// * The code uses a PostgreSQL database to store the view counts.
// * The functions ensure that the database table exists and handle errors gracefully.
// * instead we are currently using the `incrementAndGetBlogViewCount` function which combines both incrementing and retrieving the view count in a single database operation for efficiency in the page itself.

// import { NextResponse } from "next/server";
// import {
//   getBlogViewCount,
//   incrementBlogViewCount,
// } from "@/_db/queries/blog-post-views";

// POST: increment view count
// export async function POST(request) {
//   const { slug } = await request.json();
//   if (!slug)
//     return NextResponse.json({ error: "Missing slug" }, { status: 400 });
//   await incrementBlogViewCount(slug); // mutation
//   const count = await getBlogViewCount(slug); // query
//  // instead of using both incrementBlogViewCount and getBlogViewCount, we can use incrementAndGetBlogViewCount which combines both operations which is more efficient, which is actually what we are currently using in the codebase.
//   if (count === null)
//     return NextResponse.json({ error: "View count not found" }, { status: 404 });
//   // Return the updated view count
//   if (count < 0)
//     return NextResponse.json({ error: "Invalid view count" }, { status: 500 });
//   // Return the updated view count
//   return NextResponse.json({ viewCount: count });
// }

// GET: get view count
// export async function GET(request) {
//   const { searchParams } = new URL(request.url);
//   const slug = searchParams.get("slug");
//   if (!slug)
//     return NextResponse.json({ error: "Missing slug" }, { status: 400 });
//   const count = await getBlogViewCount(slug);
//   return NextResponse.json({ viewCount: count });
// }
