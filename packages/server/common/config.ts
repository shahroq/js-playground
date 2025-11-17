import { join } from "path";
import { isFileURL, getDbIdentifier } from "./utils";

const root = process.cwd();

const config = {
  root_path: `${root}`,
  data_path: `${root}/data`,

  version: process.env.VERSION || "0.0.0",
  env: process.env.NODE_ENV || "development",
  base_url: process.env.BASE_URL,
  port: parseInt(process.env.PORT || "3000"),
  debug: process.env.DEBUG === "true",

  response_format_strategy: process.env.RESPONSE_FORMAT_STRATEGY,

  validation_strategy: process.env.VALIDATION_STRATEGY,
  database_strategy: process.env.DATABASE_STRATEGY || "file-json",

  database_url: process.env.DATABASE_URL,
  database_name: null,
  database_path: null,
};
config.database_name = getDatabaseName(config.database_url);
config.database_path = getDatabasePath(config.database_url);
// console.log(config);
/*
{
  root_path: "/Users/shahroq/code/sandbox/ts-projects/sandbox-4-bun/packages/server",
  data_path: "/Users/shahroq/code/sandbox/ts-projects/sandbox-4-bun/packages/server/data",
  version: "1.0.0",
  env: "development",
  port: 3000,
  debug: false,
  validation_strategy: "joi",
  database_strategy: "lowdb-json",
  database_url: "file:/database.json",
  database_name: "database",
  database_path: "/Users/shahroq/code/sandbox/ts-projects/sandbox-4-bun/packages/server/data/lowdb-json/database.json",
}
*/
// set test env
/*
dotenv.config({ path: ".env.test.local" });
console.log(process.env);
config.test = {
  database_filname: process.env.DATABASE_FILENAME || undefined, // only for file-based strategies
  database_url: process.env.DATABASE_URL, // only for db engines
};
console.log(config);
*/
function getDatabaseName(database_url) {
  return isFileURL(database_url) ? getDbIdentifier(database_url, {}) : null;
}

function getDatabasePath(database_url) {
  return isFileURL(database_url)
    ? join(
        config.data_path,
        config.database_strategy,
        getDbIdentifier(database_url, { withExtension: true })
      )
    : null;
}

export default config;
