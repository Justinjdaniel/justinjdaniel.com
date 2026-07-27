import { neonConfig, Pool } from "@neondatabase/serverless";

// Configure Neon WebSocket constructor using the native WebSocket implementation
if (typeof globalThis.WebSocket !== "undefined") {
  neonConfig.webSocketConstructor = globalThis.WebSocket;
}

const isMock = process.env.DATABASE_URL === "mock" || !process.env.DATABASE_URL;

export const pool = !isMock
  ? (() => {
      const p = new Pool({
        connectionString: process.env.DATABASE_URL,
      });
      // Handle idle connection errors gracefully to prevent process crashes or unhandled rejections
      p.on("error", (err) => {
        console.error(
          "[database pool error] Idle connection client error:",
          err,
        );
      });
      return p;
    })()
  : null;

// Generic table initializer for extensibility
const initializedTables = new Set();

/**
 * Ensures a table exists in the database. Only runs creation once per table per process.
 * @param {string} tableName - The table name.
 * @param {string} createTableSQL - The SQL statement to create the table if it doesn't exist.
 */
export async function ensureTable(tableName, createTableSQL) {
  if (isMock) return;
  if (initializedTables.has(tableName)) return;
  let client;
  try {
    client = await pool.connect();
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
    if (client) {
      client.release();
    }
  }
}
