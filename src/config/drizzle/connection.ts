import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

if (!(process.env.DATABASE_URL)) {
  throw new Error("DATABASE_URL environment varaible is required.");
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10,                 // Maximum connections in the pool
  idleTimeoutMillis: 30000, // Close idle connections after 30 seconds
  connectionTimeoutMillis: 2000, // Max wait time for a connection
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle PostgreSQL client:', err);
});

const db = drizzle({
  client: pool
});

export {
  db,
  pool
}

