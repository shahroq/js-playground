import { join } from "path";
import { utils } from "./container";

export type Env = "development" | "production" | "test";

const root = process.cwd();

const config = {
  root_path: `${root}`,
  data_path: `${root}/data`,

  version: <string>process.env.VERSION || "0.0.0",
  env: <Env>process.env.NODE_ENV || "development",
  base_url: <string>process.env.BASE_URL,
  port: <number>(process.env.PORT || 3000),

  debug: <boolean>!!(process.env.DEBUG === "true"),
  debug_orm: <boolean>!!(process.env.DEBUG_ORM === "true"),

  user_id: <number>(process.env.USER_ID_TMP || 1), // use it till auth is not implemented

  global_pagination_limit: <number>(process.env.GLOBAL_PAGINATION_LIMIT || 10),

  envelop_system_info: <boolean>!!(process.env.ENVELOP_SYSTEM_INFO === "true"),
  app_envelope_strategy: <string>process.env.APP_ENVELOPE_STRATEGY,

  validation_strategy: <string>process.env.VALIDATION_STRATEGY,

  database_url: <string | null>process.env.DATABASE_URL,
  database_adapter_strategy: <string>process.env.DATABASE_ADAPTER_STRATEGY,

  database_type: <string | null>null,
  database_name: <string | null>null,
  database_path: <string | null>null,

  http_client_strategy: <string>process.env.HTTP_CLIENT_STRATEGY,
  api_url_jsonplaceholder: <string>process.env.API_URL_JSONPLACEHOLDER,
  api_url_restfulapi: <string>process.env.API_URL_RESTFULAPI,

  // overall system info, to display on envelop if needed (dev env)
  system_info: <string | null>null,
};

config.database_type = getDBType(config.database_url);
config.database_name = getDBName(config.database_url);
config.database_path = getDBPath(config.database_url);
config.system_info = getSystemInfo();
// console.log(config);

export function getDBType(database_url: string | null) {
  if (!database_url) return null;

  // 1. Handle file-based URLs
  if (utils.isFileURL(database_url)) {
    const lower = database_url.toLowerCase();

    if (lower.endsWith(".json")) return "json";
    if (lower.endsWith(".db") || lower.endsWith(".sqlite")) return "sqlite";

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

// get info for dev env
export function getSystemInfo() {
  const system = [];

  system.push(
    "express",
    config.app_envelope_strategy,
    config.database_adapter_strategy,
    config.validation_strategy,
    config.http_client_strategy
  );

  return system.join(":");
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
