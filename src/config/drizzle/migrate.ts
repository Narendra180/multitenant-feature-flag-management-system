import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";

if (!(process.env.DATABASE_URL)) {
  throw new Error("DATABASE_URL environment varaible is required.");
}

const db = drizzle(process.env.DATABASE_URL!);

async function runMigration() {
  await migrate(db, {
    migrationsFolder: "./drizzle"
  });
  console.log("Applied migrations successfully.");
  process.exit(0);
}

runMigration();
