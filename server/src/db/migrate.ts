import { config } from "dotenv";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

config();
const databaseUrl = drizzle(
  postgres(`${process.env.DATABASE_URL}`, { ssl: "require", max: 1 }),
);

/**
 * For just doing migration using CLI.
 */
async function main() {
  try {
    await migrate(databaseUrl, { migrationsFolder: "./src/db/drizzle/" });
    console.log("Migration complete");
  } catch (error) {
    console.log(error);
  }
  process.exit(0);
}

main();
