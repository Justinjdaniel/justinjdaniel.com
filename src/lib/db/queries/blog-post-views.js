import { ensureTable, pool } from "../db";

const isMock = !pool;
let dbInitPromise = null;

function getDbInit() {
  if (isMock) return Promise.resolve();
  if (!dbInitPromise) {
    dbInitPromise = ensureTable(
      "blog_views",
      "CREATE TABLE IF NOT EXISTS blog_views (slug TEXT PRIMARY KEY, count INTEGER DEFAULT 0);",
    );
  }
  return dbInitPromise;
}

/**
 * Increments the view count for a blog post and returns the updated count.
 * @param {string} slug - The blog post slug.
 * @returns {Promise<number|null>} The updated view count or null on error.
 */
export async function incrementAndGetBlogViewCount(slug) {
  if (isMock) return 0;
  await getDbInit();
  const client = await pool.connect();
  try {
    const result = await client.query(
      `INSERT INTO blog_views (slug, count) VALUES ($1, 1)
       ON CONFLICT (slug) DO UPDATE SET count = blog_views.count + 1
       RETURNING count;`,
      [slug],
    );
    return result.rows[0]?.count ?? null;
  } catch (error) {
    console.error(
      "[incrementAndGetBlogViewCount] A database error occurred while incrementing the view count.",
    );
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }
    throw new Error("A database error occurred. Please try again later.");
  } finally {
    client.release();
  }
}

// ----------- Sample functions for mutation and query ------- //
/**
 * Increments the view count for a blog post (does not return the count).
 * @param {string} slug - The blog post slug.
 * @returns {Promise<void>}
 */
export async function incrementBlogViewCount(slug) {
  if (isMock) return;
  await getDbInit();
  const client = await pool.connect();
  try {
    await client.query(
      `INSERT INTO blog_views (slug, count) VALUES ($1, 1)
       ON CONFLICT (slug) DO UPDATE SET count = blog_views.count + 1;`,
      [slug],
    );
  } catch (error) {
    console.error(
      "[incrementBlogViewCount] A database error occurred while incrementing the view count.",
    );
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }
    throw new Error("A database error occurred. Please try again later.");
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
  if (isMock) return 0;
  await getDbInit();
  const client = await pool.connect();
  try {
    const result = await client.query(
      "SELECT count FROM blog_views WHERE slug = $1;",
      [slug],
    );
    return result.rows[0]?.count ?? null;
  } catch (error) {
    console.error(
      "[getBlogViewCount] A database error occurred while fetching the view count.",
    );
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }
    throw new Error("A database error occurred. Please try again later.");
  } finally {
    client.release();
  }
}
