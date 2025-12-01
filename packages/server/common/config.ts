import { join } from "path";
import { utils } from "./container";

const root = process.cwd();

const config = {
  root_path: `${root}`,
  data_path: `${root}/data`,

  version: process.env.VERSION || "0.0.0",
  env: process.env.NODE_ENV || "development",
  base_url: process.env.BASE_URL,
  port: parseInt(process.env.PORT || "3000"),
  debug: process.env.DEBUG === "true",

  pagination_per_page: process.env.PAGINATION_PER_PAGE || 10,

  app_envelope_strategy: process.env.APP_ENVELOPE_STRATEGY,

  validation_strategy: process.env.VALIDATION_STRATEGY,

  database_url: process.env.DATABASE_URL as string | null,
  database_adapter_strategy: process.env.DATABASE_ADAPTER_STRATEGY,

  database_type: null as string | null,
  database_name: null as string | null,
  database_path: null as string | null,

  http_client_strategy: process.env.HTTP_CLIENT_STRATEGY,
  api_url_jsonplaceholder: process.env.API_URL_JSONPLACEHOLDER,
  api_url_restfulapi: process.env.API_URL_RESTFULAPI,
};

config.database_type = getDBType(config.database_url);
config.database_name = getDBName(config.database_url);
config.database_path = getDBPath(config.database_url);
// console.log(config);

export function getDBType(database_url: string | null) {
  if (!database_url) return null;

  // 1. Handle file-based URLs
  if (utils.isFileURL(database_url)) {
    const lower = database_url.toLowerCase();

    if (lower.endsWith(".json")) return "json";
    if (lower.endsWith(".db")) return "sqlite";

    return "unknown"; // fallback for unknown file types
  }

  // 2. Extract protocol (e.g., mysql://, postgres://)
  const protocolMatch = database_url.match(/^([a-zA-Z0-9+]+):\/\//);
  // ensure the capture exists before accessing it
  if (protocolMatch && protocolMatch[1]) {
    return protocolMatch[1].toLowerCase(); // "mysql", "postgres", etc.
  }

  return "unknown";
}

function getDBName(database_url: string | null) {
  if (!database_url) return null;
  return utils.getDBIdentifier(database_url, {});
}

function getDBPath(database_url: string | null) {
  if (!database_url) return null;
  return utils.isFileURL(database_url)
    ? join(
        config.data_path,
        `${config.database_adapter_strategy}-${config.database_type}`,
        utils.getDBIdentifier(database_url, { withExtension: true })
      )
    : null;
}

/*
{
  root_path: "/Users/shahroq/code/sandbox/ts-projects/sandbox-api-design-2025/packages/server",
  data_path: "/Users/shahroq/code/sandbox/ts-projects/sandbox-api-design-2025/packages/server/data",
  version: "1.0.0",
  env: "development",
  base_url: "http://localhost",
  port: 3000,
  debug: true,
  app_response_strategy: "jsend",
  validation_strategy: "zod",
  database_type: "sqlite",
  database_url: "file:./database.db",
  database_name: "database",
  database_path: "/Users/shahroq/code/sandbox/ts-projects/sandbox-api-design-2025/packages/server/data/prisma-sqlite/database.db",
  database_adapter_strategy: "prisma",
  http_client_strategy: "axios",
  api_url_jsonplaceholder: "https://jsonplaceholder.typicode.com",
}
*/
// set test env
/*
dotenv.config({ path: ".env.test.local" });
console.log(process.env);
config.test = {
  database_filname: process.env.Db_FILENAME || undefined, // only for file-based strategies
  database_url: process.env.Db_URL, // only for db engines
};
*/

export default config;
