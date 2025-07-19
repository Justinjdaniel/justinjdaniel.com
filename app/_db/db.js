import { Pool } from "pg";

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

// Generic table initializer for extensibility
const initializedTables = new Set();

/**
 * Ensures a table exists in the database. Only runs creation once per table per process.
 * @param {string} tableName - The table name.
 * @param {string} createTableSQL - The SQL statement to create the table if it doesn't exist.
 */
export async function ensureTable(tableName, createTableSQL) {
  if (initializedTables.has(tableName)) return;
  const client = await pool.connect();
  try {
    await client.query(createTableSQL);
    initializedTables.add(tableName);
  } catch (error) {
    console.error(
      `[ensureTable] A database error occurred while ensuring table '${tableName}'.`,
    );
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }
    throw new Error("A database error occurred. Please try again later.");
  } finally {
    client.release();
  }
}
