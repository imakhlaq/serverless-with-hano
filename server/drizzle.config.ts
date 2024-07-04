import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/models/index.ts",
  out: "./src/db/drizzle",
  dialect: "postgresql", // "postgresql" | "mysql"
  verbose: true,
  strict: true,
});
