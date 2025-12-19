import { config, t } from "@/common/container";
import { MemoryAdapter } from "./memory.adapter";
import { FileAdapter } from "./file.adapter";
import { LowDbAdapter } from "./lowdb.adapter";
import { PrismaAdapter } from "./prisma.adapter";
import type { IDbClient } from "./db-client.interface";

let instance: IDbClient | null = null;

// add identifier here (filepath, or db engine name)?
// factory: db client
export function createDbClient(): IDbClient {
  if (instance) return instance;

  let dbClient;

  const adapter = "db-client";
  const strategy = config.database.client_strategy;

  console.log(
    t("console.getAdapter", {
      adapter,
      strategy: `${strategy}/${config.database.type}`,
    })
  );

  switch (strategy) {
    case "memory":
      dbClient = new MemoryAdapter();
      break;
    case "file":
      dbClient = new FileAdapter();
      break;
    case "lowdb":
      dbClient = new LowDbAdapter();
      break;
    case "prisma":
      dbClient = new PrismaAdapter();
      break;
    default:
      throw new Error(t("console.noAdapter", { adapter, strategy }));
  }

  dbClient.connect();

  // Store the instance for future calls
  instance = dbClient;

  return instance;
}

// useful for testing
export function resetDBAdapter(): void {
  instance = null;
}
/*
// class-based
export class DatabaseFactory {
  static create(): IDatabase {
    const strategy = config.database.strategy as DatabaseStrategy;
    const databaseFile = config.database.filname || "database.json";
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
