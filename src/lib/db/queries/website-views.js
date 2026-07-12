import { ensureTable, pool } from "../db";

const isMock = !pool;

const dbInitPromise = ensureTable(
  "website_views",
  "CREATE TABLE IF NOT EXISTS website_views (id SERIAL PRIMARY KEY, count INTEGER DEFAULT 0);",
);

/**
 * Increments the website view count by 1.
 * Should be called when the layout is loaded.
 * @returns {Promise<void>}
 */
export async function incrementWebsiteViewCount() {
  if (isMock) return;
  await dbInitPromise;
  let client;
  try {
    client = await pool.connect();
    await client.query(`
      INSERT INTO website_views (id, count) VALUES (1, 1)
      ON CONFLICT (id) DO UPDATE SET count = website_views.count + 1;
    `);
  } catch (error) {
    console.error(
      "[incrementWebsiteViewCount] A database error occurred while incrementing the website view count.",
    );
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }
    throw new Error("A database error occurred. Please try again later.");
  } finally {
    if (client) {
      client.release();
    }
  }
}
