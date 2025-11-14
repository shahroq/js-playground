import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  // schema: "prisma/schema.prisma",
  schema: "data/prisma-sqlite/schema.prisma",
  migrations: {
    // path: "prisma/migrations",
    path: "data/prisma-sqlite/migrations",
  },
  engine: "classic",
  datasource: {
    url: env("DATABASE_URL"),
  },
});
