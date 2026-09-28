import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

// Keep module evaluation safe during static analysis and build-time route collection.
// Database requests still fail gracefully in the route when no runtime URL is configured.
const databaseUrl = process.env.DATABASE_URL ?? "postgresql://localhost:5432/document_conversion";

const globalForDb = globalThis as typeof globalThis & {
  __arenaNextJsPostgresqlPool?: Pool;
};

export const pool =
  globalForDb.__arenaNextJsPostgresqlPool ??
  new Pool({
    connectionString: databaseUrl,
  });

if (process.env.NODE_ENV !== "production") {
  globalForDb.__arenaNextJsPostgresqlPool = pool;
}

export const db = drizzle(pool);
