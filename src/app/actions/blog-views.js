"use server";

import {
  getBlogViewCount,
  incrementAndGetBlogViewCount,
} from "@/lib/db/queries/blog-post-views";
import { getBlogPosts } from "@/lib/db/blog";

/**
 * Increments the view count for a blog post.
 * @param {string} slug - The blog post slug.
 * @returns {Promise<number|null>} The updated view count.
 * @throws {Error} If the blog post slug is missing or does not exist.
 */
export async function incrementBlogView(slug) {
  if (!slug) {
    throw new Error("Slug is required to increment blog views.");
  }

  // Validate that the slug exists in the canonical blog post list
  const posts = getBlogPosts();
  const validSlugs = new Set(posts.map((post) => post.slug));

  if (!validSlugs.has(slug)) {
    throw new Error(`Blog post with slug "${slug}" does not exist.`);
  }

  return await incrementAndGetBlogViewCount(slug);
}

/**
 * Retrieves the current view count for a blog post.
 * @param {string} slug - The blog post slug.
 * @returns {number|null} The current view count, or `null` if no count exists.
 * @throws {Error} If `slug` is missing.
 */
export async function getBlogView(slug) {
  if (!slug) {
    throw new Error("Slug is required to get blog views.");
  }
  return await getBlogViewCount(slug);
}
