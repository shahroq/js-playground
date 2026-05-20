import "dotenv/config";
import { drizzle } from "drizzle-orm/libsql";
// import { tasksTable } from "@/data/schema";

export const db = drizzle(process.env.DB_FILE_NAME!);

// const data = {
//   title: "task 1",
//   desc: "desc 1",
// };
// await db.insert(tasksTable).values(data);
