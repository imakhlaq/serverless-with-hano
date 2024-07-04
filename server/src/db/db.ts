import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

/**
 * It takes and database connection string and returns a connection object.
 * @param db_URL
 */
function db(db_URL: string) {
  const sql = neon(db_URL);
  return drizzle(sql);
}

export default db;
