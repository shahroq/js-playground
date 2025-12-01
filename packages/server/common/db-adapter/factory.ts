import { config } from "@/common/container";
import { FileDBAdapter } from "./file-db-adapter";
import { LowDBDBAdapter } from "./lowdb-db-adapter";
import { PrismaDBAdapter } from "./prisma-db-adapter";
import type { DBAdapterStrategy, IDBAdapter } from "./db-adapter.interface";

let dbAdapterInstance: IDBAdapter | null = null;

// add identifier here (filepath, or db engine name)?
export function getDBAdapter(): IDBAdapter {
  if (dbAdapterInstance) return dbAdapterInstance;

  const strategy = config.database_adapter_strategy as DBAdapterStrategy;
  let dbAdapter;
  console.log(`⚙️  Getting db adapter (${strategy})`);

  switch (strategy) {
    case "file":
      dbAdapter = new FileDBAdapter();
      break;
    case "lowdb":
      dbAdapter = new LowDBDBAdapter();
      break;
    case "prisma":
      dbAdapter = new PrismaDBAdapter();
      break;
    default:
      throw new Error(`Unsupported database adapter strategy: ${strategy}`);
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
