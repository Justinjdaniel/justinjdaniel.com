"use server";

import {
  getBlogViewCount,
  incrementAndGetBlogViewCount,
} from "@/lib/db/queries/blog-post-views";
import {
  hasRecentVisit,
  recordVisit,
  removeVisit,
} from "@/lib/db/queries/blog-visit-tracking";
import { getBlogPosts } from "@/lib/db/blog";

/**
 * Server Action to increment the view count of a blog post and return the updated count.
 * Deduplicates rapid re-visits or StrictMode remounts based on a stable visitId.
 * @param {string} slug - The blog post slug.
 * @param {string} [visitId] - A stable identifier for the user session/visit.
 * @returns {Promise<number|null>} The updated view count.
 */
export async function incrementBlogView(slug, visitId) {
  if (!slug) {
    throw new Error("Slug is required to increment blog views.");
  }

  // Validate slug against canonical blog posts
  const allPosts = getBlogPosts();
  const validSlugs = new Set(allPosts.map((post) => post.slug));
  if (!validSlugs.has(slug)) {
    throw new Error("Slug is required to increment blog views.");
  }

  if (visitId) {
    const visitKey = `${slug}:${visitId}`;
    // Check if this visit was recently recorded
    if (await hasRecentVisit(visitKey)) {
      // If already visited, retrieve the existing count without incrementing
      return await getBlogViewCount(slug);
    }

    // Record the visit before incrementing
    await recordVisit(visitKey);

    try {
      // Attempt to increment the view count
      return await incrementAndGetBlogViewCount(slug);
    } catch (error) {
      // If increment fails, remove the visit key to allow retry
      await removeVisit(visitKey);
      throw error;
    }
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
