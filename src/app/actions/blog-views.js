"use server";

import {
  getBlogViewCount,
  incrementAndGetBlogViewCount,
} from "@/lib/db/queries/blog-post-views";

/**
 * Server Action to increment the view count of a blog post and return the updated count.
 * @param {string} slug - The blog post slug.
 * @returns {Promise<number|null>} The updated view count.
 */
export async function incrementBlogView(slug) {
  if (!slug) {
    throw new Error("Slug is required to increment blog views.");
  }
  return await incrementAndGetBlogViewCount(slug);
}

/**
 * Server Action to get the current view count of a blog post.
 * @param {string} slug - The blog post slug.
 * @returns {Promise<number|null>} The current view count.
 */
export async function getBlogView(slug) {
  if (!slug) {
    throw new Error("Slug is required to get blog views.");
  }
  return await getBlogViewCount(slug);
}
