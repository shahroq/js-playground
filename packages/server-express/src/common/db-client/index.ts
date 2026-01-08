import { config, t } from "@/common/container";
import type { IDbClientService } from "./db-client-service.interface";
import { MemoryService } from "./providers/memory.service";
import { FileService } from "./providers/file.service";
import { LowDbService } from "./providers/lowdb.service";
import { PrismaService } from "./providers/prisma.service";

const module = "db client service";
const strategy = config.database.client_strategy;

console.log(t("console.getProvider", { module, strategy }));

// add identifier here (filepath, or db engine name)?
let provider: IDbClientService;

switch (strategy) {
  /*
  case "memory":
    provider = new MemoryService();
    break;
  case "file":
    provider = new FileService();
    break;
  case "lowdb":
    provider = new LowDbService();
    break;
  */
  case "prisma":
    provider = new PrismaService();
    break;
  default:
    throw new Error(t("console.noProvider", { module, strategy }));
}
provider.connect();

export { provider as dbCientService };

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
