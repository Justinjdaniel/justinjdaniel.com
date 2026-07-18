"use server";

import { getBlogPosts } from "@/lib/db/blog";
import {
  getBlogViewCount,
  incrementAndGetBlogViewCount,
} from "@/lib/db/queries/blog-post-views";

// Bounded set to deduplicate rapid increments for the same visit
const recentVisits = new Set();

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
    if (recentVisits.has(visitKey)) {
      // If already visited, retrieve the existing count without incrementing
      return await getBlogViewCount(slug);
    }
    recentVisits.add(visitKey);
    // Boundary checks to prevent memory leaks over long processes
    if (recentVisits.size > 10000) {
      recentVisits.clear();
      recentVisits.add(visitKey);
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
