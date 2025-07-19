import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

/**
 * Increments the view count for a blog post (does not return the count).
 * @param {string} slug - The blog post slug.
 * @returns {Promise<void>}
 */
export async function incrementBlogViewCount(slug) {
  const client = await pool.connect();
  try {
    await client.query(
      "CREATE TABLE IF NOT EXISTS blog_views (slug TEXT PRIMARY KEY, count INTEGER DEFAULT 0);",
    );
    await client.query(
      `INSERT INTO blog_views (slug, count) VALUES ($1, 1)
       ON CONFLICT (slug) DO UPDATE SET count = blog_views.count + 1;`,
      [slug],
    );
  } catch (error) {
    console.error("Error incrementing view count:", error);
  } finally {
    client.release();
  }
}

/**
 * Gets the view count for a blog post.
 * @param {string} slug - The blog post slug.
 * @returns {Promise<number|null>} The current view count or null if not found.
 */
export async function getBlogViewCount(slug) {
  const client = await pool.connect();
  try {
    await client.query(
      "CREATE TABLE IF NOT EXISTS blog_views (slug TEXT PRIMARY KEY, count INTEGER DEFAULT 0);",
    );
    const result = await client.query(
      "SELECT count FROM blog_views WHERE slug = $1;",
      [slug],
    );
    return result.rows[0]?.count ?? null;
  } catch (error) {
    console.error("Error fetching view count:", error);
    return null;
  } finally {
    client.release();
  }
}

/**
 * Increments the view count for a blog post and returns the updated count.
 * @param {string} slug - The blog post slug.
 * @returns {Promise<number|null>} The updated view count or null on error.
 */
export async function incrementAndGetBlogViewCount(slug) {
  const client = await pool.connect();
  try {
    await client.query(
      "CREATE TABLE IF NOT EXISTS blog_views (slug TEXT PRIMARY KEY, count INTEGER DEFAULT 0);",
    );
    const result = await client.query(
      `INSERT INTO blog_views (slug, count) VALUES ($1, 1)
       ON CONFLICT (slug) DO UPDATE SET count = blog_views.count + 1
       RETURNING count;`,
      [slug],
    );
    return result.rows[0]?.count ?? null;
  } catch (error) {
    console.error("Error incrementing view count:", error);
    return null;
  } finally {
    client.release();
  }
}
