import { PrismaClient, Prisma } from "@/generated/prisma/client";
import { isoString } from "@/common/utils/utils";
import type { IDBAdapter } from "./db-adapter.interface";
import type { INormalizedQuery } from "../type/type";

const collectionModelMap: { [key: string]: Uncapitalize<Prisma.ModelName> } = {
  products: "product",
  reviews: "review",
  users: "user",
} as const;

type CollectionName = keyof typeof collectionModelMap;
type ModelName = (typeof collectionModelMap)[CollectionName];
// type ModelName = Uncapitalize<Prisma.ModelName>;

export class PrismaDBAdapter implements IDBAdapter {
  private dbClient: PrismaClient;

  constructor() {
    // Prisma will use the DATABASE_URL from .env
    // Example: DATABASE_URL=“mysql://user:password@localhost:3306/mydb”
    // Or: DATABASE_URL=“file:./database.db”
    this.dbClient = new PrismaClient();
  }

  async connect(): Promise<void> {
    await this.dbClient.$connect();
    await this.dbClient.$executeRawUnsafe(`PRAGMA foreign_keys = OFF;`);

    console.log("🌕 Prisma connected");
  }

  async disconnect(): Promise<void> {
    await this.dbClient.$disconnect();
    console.log("🌒 Prisma disconnected");
  }

  async find<T>(collection: string, args: INormalizedQuery): Promise<T[]> {
    const q: any = {};

    // Pagination
    if (args.per_page) q.take = args.per_page;
    if (args.offset) q.skip = args.offset;

    // Convert where filter to Prisma format
    /*
    // sort
    if (query.orderBy) {
      q.orderBy = {
        [query.orderBy.field as string]: query.orderBy.direction,
      };
    }

    // filters
    if (query.where && typeof query.where !== "function") {
      q.where = query.where;
    }
    */

    // @ts-ignore
    return await this.dbClient[collectionModelMap[collection]].findMany(q);
  }

  async findOne<T>(
    collection: string,
    args: INormalizedQuery
  ): Promise<T | null> {
    const q: any = {};

    /*
    if (query.where && typeof query.where !== "function") {
      q.where = query.where;
    }
      */

    // @ts-ignore
    return await this.dbClient[collectionModelMap[collection]].findFirst(query);
  }
  /*
  async findAll<T>(collection: string): Promise<T[]> {
    // @ts-ignore - Dynamic collection access
    return await this.dbClient[collectionModelMap[collection]].findMany();
  }
  */

  async findById<T>(
    collection: string,
    id: string | number
  ): Promise<T | null> {
    // use findOne
    return await this.dbClient[collectionModelMap[collection]].findUnique({
      where: { id },
    });
  }

  async create<T>(collection: string, data: T): Promise<T> {
    const newItem = {
      ...data,
      created_at: isoString(),
      created_by: 1,
      updated_by: 1,
    };

    return await this.dbClient[collectionModelMap[collection]].create({
      data: newItem,
    });
  }

  async update<T>(
    collection: string,
    id: string | number,
    data: Partial<T>
  ): Promise<T | null> {
    // first check if exists
    const existing = await this.findById<T>(collection, id);
    if (!existing) return null;

    const updatedItem = {
      ...data,
      updated_at: isoString(),
      updated_by: 1,
    };

    return await this.dbClient[collectionModelMap[collection]].update({
      where: { id },
      data: updatedItem,
    });
  }

  async delete(collection: string, id: string | number): Promise<boolean> {
    const result = await this.dbClient[
      collectionModelMap[collection]
    ].deleteMany({
      where: { id },
    });

    return !!result.count;
  }

  async deleteMany<T>(
    collection: string,
    filter: QueryFilter<T> = {}
  ): Promise<number> {
    await this.dbClient.$executeRawUnsafe(`PRAGMA foreign_keys = OFF;`);

    const result =
      await this.dbClient[collectionModelMap[collection]].deleteMany();
    return result.count;
  }

  async count<T>(collection: string, filter?: QueryFilter<T>): Promise<number> {
    const query: any = {};

    if (filter?.where && typeof query.where !== "function") {
      q.where = query.where;
    }

    // @ts-ignore
    return await this.dbClient[collectionModelMap[collection]].count(query);
  }

  async createDB(identifier: string) {
    // done via cli
  }

  override async migrate() {
    // migration is done via prisma cli
    console.log(`Migration is not necessary for Prisma. It's done via cli.`);
    // this.createDB(config.database_name);
  }
}
