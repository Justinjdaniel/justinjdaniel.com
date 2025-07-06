import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Add more config if needed (ssl, etc.)
});

export async function incrementViewCount(slug) {
  // Upsert: increment if exists, else insert
  await pool.query(
    "INSERT INTO blog_post_views (slug, view_count) VALUES ($1, 1) ON CONFLICT (slug) DO UPDATE SET view_count = blog_post_views.view_count + 1",
    [slug],
  );
}

export async function getViewCount(slug) {
  const result = await pool.query(
    "SELECT view_count FROM blog_post_views WHERE slug = $1",
    [slug],
  );
  return result.rows[0]?.view_count || 0;
}
