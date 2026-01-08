import { join } from "path";
import { utils } from "./container";
import { UserRole } from "@users/types";
import { ReviewStatus } from "@reviews/types";
import { LogLevel, type LoggerStrategy } from "./logger/logger.interface";
import type { MailerStrategy } from "./mailer/mailer.interface";
import type { HttpClientStrategy } from "./http-client/http-client.interface";
import type { ValidationStrategy } from "./validation/types";
import type { EnvelopeStrategy } from "./envelope/envelope.interface";
import type { DBAdapterStrategy } from "./db-client/db-client.interface";
import type { AuthStrategy } from "./auth/types";
import type { HashingStrategy } from "./hashing/hashing-service.interface";

export type Env = "development" | "production" | "test";

const root = process.cwd();

const config = {
  root_path: `${root}`,
  data_path: `${root}/data`,

  // basics
  env: <Env>process.env.NODE_ENV || "development",
  base_url: <string>process.env.BASE_URL,
  port: <number>(process.env.PORT || 3000),
  app_name: <string>process.env.APP_NAME || "APP",
  version: <string>process.env.VERSION || "0.0.0",

  // hashing
  hashing: {
    strategy: <HashingStrategy>process.env.HASHING_STRATEGY,
  },

  // auth
  auth: {
    strategy: <AuthStrategy>process.env.AUTH_STRATEGY,
    anonymous: {},
    jwt: {
      secret: <string>(process.env.AUTH_JWT_SECRET || ""),
      expires_in: <number>+(process.env.AUTH_JWT_EXPIRES_IN || 3600),
    },
    auth0: {
      domain: <string>(process.env.AUTH_AUTH0_DOMAIN || ""),
      audience: <number>+(process.env.AUTH_AUTH0_AUDIENCE || ""),
    },
  },

  // debug
  debug: {
    show_thrown_errors: <boolean>(
      !!(process.env.DEBUG_SHOW_THROWN_ERROR === "true")
    ),
    show_executed_sql: <boolean>(
      !!(process.env.DEBUG_SHOW_EXECUTED_SQL === "true")
    ),
  },

  // logger
  logger: {
    strategy: <LoggerStrategy>process.env.LOGGER_strategy || "console-log",
    level: <LogLevel>process.env.LOGGER_LEVEL || LogLevel.INFO,
    morgan_enabled: <boolean>!!(process.env.LOGGER_MORGAN_ENABLED === "true"),
    morgan_format: <string>process.env.LOGGER_MORAGN_FORMAT || "tiny",
  },

  // defaults
  default: {
    user_role: (process.env.DEFAULT_USER_ROLE as UserRole) || UserRole.USER,
    user_id: <number>+(process.env.DEFAULT_USER_ID || 1), // use it till auth is not implemented
    pagination_limit: <number>+(process.env.DEFAULT_PAGINATION_LIMIT || 10),
    pagination_max_limit: <number>(
      +(process.env.DEFAULT_PAGINATION_MAX_LIMIT || 20)
    ),
    review_status:
      (process.env.DEFAULT_REVIEW_STATUS as ReviewStatus) ||
      ReviewStatus.PENDING,
  },

  // app-envelope (response)
  envelope: {
    strategy: <EnvelopeStrategy>process.env.ENVELOPE_STRATEGY || "jsend",
    include_system_info: <boolean>(
      !!(process.env.ENVELOPE_INCLUDE_SYSTEM_INFO === "true")
    ),
  },

  // validation
  validation: {
    strategy: <ValidationStrategy>process.env.VALIDATION_STRATEGY,
  },

  // database
  database: {
    client_strategy: <DBAdapterStrategy>process.env.DATABASE_CLIENT_STRATEGY,
    url: <string | null>process.env.DATABASE_URL,

    type: <string | null>null,
    name: <string | null>null,
    path: <string | null>null,
  },

  // http-client
  http_client: {
    strategy: <HttpClientStrategy>process.env.HTTP_CLIENT_STRATEGY,
    api_url_jsonplaceholder: <string>(
      process.env.HTTP_CLIENT_API_URL_JSONPLACEHOLDER
    ),
    api_url_restfulapi: <string>process.env.HTTP_CLIENT_API_URL_RESTFULAPI,
  },

  // api infos
  api: {
    jsonplaceholder: {
      url: <string>process.env.API_JSONPLACEHOLDER_URL,
    },
    httpbin: {
      url: <string>process.env.API_HTTPBIN_URL,
    },
    restfulapi: {
      url: <string>process.env.API_RESTFULAPI_URL,
    },
  },

  // mailer
  mailer: {
    strategy: <MailerStrategy>process.env.MAILER_STRATEGY || "console-log",
    protocol: <string>process.env.MAILER_PROTOCOL || "smpt",
    host: <string>process.env.MAILER_HOST || "",
    port: <number>(process.env.MAILER_PORT || 0),
    username: <string>process.env.MAILER_USERNAME || "",
    password: <string>process.env.MAILER_PASSWORD || "",
    admin_email: <string>process.env.MAILER_ADMIN_EMAIL || "",

    mailtrap_api_token: <string>process.env.MAILTRAP_API_TOKEN || "",
  },

  // overall system info, to display on envelop if needed (dev env)
  system_info: <string | null>null,
};

config.database.type = getDBType(config.database.url);
config.database.name = getDBName(config.database.url);
config.database.path = getDBPath(config.database.url);
config.system_info = getSystemInfo();
// console.log(config);

export function getDBType(url: string | null) {
  if (!url) return null;

  // 1. Handle file-based URLs
  if (utils.isFileURL(url)) {
    const lower = url.toLowerCase();

    if (lower.endsWith(".json")) return "json";
    if (lower.endsWith(".db") || lower.endsWith(".sqlite")) return "sqlite";

    return "unknown"; // fallback for unknown file types
  }

  // 2. Extract protocol (e.g., mysql://, postgres://)
  const protocolMatch = url.match(/^([a-zA-Z0-9+]+):\/\//);
  // ensure the capture exists before accessing it
  if (protocolMatch && protocolMatch[1]) {
    return protocolMatch[1].toLowerCase(); // "mysql", "postgres", etc.
  }

  return "unknown";
}

function getDBName(url: string | null) {
  if (!url) return null;
  return utils.getDBIdentifier(url, {});
}

function getDBPath(url: string | null) {
  if (!url) return null;
  return utils.isFileURL(url)
    ? join(
        config.data_path,
        `${config.database.client_strategy}-${config.database.type}`,
        utils.getDBIdentifier(url, { withExtension: true })
      )
    : null;
}

// get info for dev env
export function getSystemInfo() {
  const system = [];

  system.push(
    "express",
    config.envelope.strategy,
    config.database.client_strategy,
    config.validation.strategy,
    config.http_client.strategy
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
  database.type: "sqlite",
  database.url: "file:./database.db",
  database.name: "database",
  database.path: "/Users/shahroq/code/sandbox/ts-projects/sandbox-api-design-2025/packages/server/data/prisma-sqlite/database.db",
  database.adapter_strategy: "prisma",
  http_client_strategy: "axios",
  api_url_jsonplaceholder: "https://jsonplaceholder.typicode.com",
}
*/
// set test env
/*
dotenv.config({ path: ".env.test.local" });
console.log(process.env);
config.test = {
  database.filname: process.env.Db_FILENAME || undefined, // only for file-based strategies
  database.url: process.env.Db_URL, // only for db engines
};
*/

export default config;
