import "dotenv/config";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

// throw new Error("Error for no reason!");

const url = process.env.DB_FILE_NAME;
if (!url) throw new Error("DB_FILE_NAME environment variable is missing");

const client = createClient({ url });
export const db = drizzle(client);

/**
 * Check database connection
 * Call this once at startup
 */
export async function checkDbConnection() {
  try {
    await client.execute("SELECT 1");
    console.log("✅ Database connection successful");
  } catch (error: any) {
    console.error("❌ Database connection failed");
    throw new Error(`Database connection failed: ${error.message}`);
  }
}

// const data = {
//   title: "task 1",
//   desc: "desc 1",
// };
// await db.insert(tasksTable).values(data);
