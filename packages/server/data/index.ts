import config from "@/common/config";
import type { BaseAdapter, DatabaseStrategy } from "./base-adapter";
import { FileJSONAdapter } from "./file-json/file-json-adapter";
import { LowDBJSONAdapter } from "./lowdb-json/lowdb-json-adapter";
import { PrismaSQLiteAdapter } from "./prisma-sqlite/prisma-sqlite-adapter";

let dbAdapterInstance: BaseAdapter | null = null;

// add identifier here (filepath, or db engine name)?
export function getDBAdapter(): BaseAdapter {
  if (dbAdapterInstance) return dbAdapterInstance;

  const strategy = config.database_strategy as DatabaseStrategy;
  let dbAdapter;

  switch (strategy) {
    case "file-json":
      dbAdapter = new FileJSONAdapter();
      break;
    case "lowdb-json":
      dbAdapter = new LowDBJSONAdapter();
      break;
    case "prisma-sqlite":
      dbAdapter = new PrismaSQLiteAdapter();
      break;
    default:
      throw new Error(`Unsupported database strategy: ${strategy}`);
  }

  dbAdapter.connect();

  // Store the instance for future calls
  dbAdapterInstance = dbAdapter;

  return dbAdapterInstance;
}

// useful for testing
export function resetDBAdapter(): void {
  dbAdapterInstance = null;
}
/*
// class-based
export class DatabaseFactory {
  static create(): IDatabase {
    const strategy = config.database_strategy as DatabaseStrategy;
    const databaseFile = config.database_filname || "database.json";
    const filePath = join(config.data_path, strategy, databaseFile);
    let dbAdapter;

    switch (strategy) {
      case "file-json":
        dbAdapter = new FileJSONAdapter(filePath);
        break;
      case "lowdb-json":
        dbAdapter = new LowDBJSONAdapter(filePath);
        break;
      case "prisma-sqlite":
        dbAdapter = new PrismaSQLiteAdapter();
        break;
      default:
        throw new Error(`Unsupported database strategy: ${strategy}`);
    }

    dbAdapter.connect();
    return dbAdapter;
  }
}
*/
