import pool from "./db";

/**
 * Increment view count for a blog post in NeonDB.
 * Ensures the table exists, then upserts the view count for the given slug.
 * @param {string} slug - The blog post slug
 * @returns {Promise<number>} - The new view count
 */
export async function incrementBlogViewCount(slug) {
  // Ensure the table exists (id SERIAL PRIMARY KEY, slug TEXT UNIQUE, views INTEGER)
  await pool.query(`CREATE TABLE IF NOT EXISTS blog_views (
    id SERIAL PRIMARY KEY,
    slug TEXT UNIQUE,
    views INTEGER DEFAULT 0
  )`);

  // Upsert: increment views if exists, else insert
  const result = await pool.query(
    `INSERT INTO blog_views (slug, views)
     VALUES ($1, 1)
     ON CONFLICT (slug)
     DO UPDATE SET views = blog_views.views + 1
     RETURNING views`,
    [slug],
  );
  return result.rows[0].views;
}

/**
 * Get the current view count for a blog post by slug.
 * @param {string} slug - The blog post slug
 * @returns {Promise<number|null>} - The current view count or null if not found
 */
export async function getBlogViewCount(slug) {
  const result = await pool.query(
    "SELECT views FROM blog_views WHERE slug = $1",
    [slug],
  );
  return result.rows[0]?.views ?? null;
}
