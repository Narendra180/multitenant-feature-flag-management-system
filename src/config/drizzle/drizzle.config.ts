import "dotenv/config";
import { defineConfig } from "drizzle-kit";

if (!(process.env.DATABASE_URL)) {
  throw new Error("DATABASE_URL environment varaible is required.");
}

export default defineConfig({
  out: "./drizzle",
  schema: "./src/config/drizzle/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
