import { PrismaClient, Prisma } from "@/generated/prisma/client";
import { isoString } from "@/common/utils/utils";
import type { IDBAdapter } from "./db-adapter.interface";
import type {
  EntityId,
  Pagination,
  OrderBy,
  Filter,
  INormQuery,
} from "@/common/type/type";

const collectionModelMap: { [key: string]: Uncapitalize<Prisma.ModelName> } = {
  products: "product",
  reviews: "review",
  users: "user",
} as const;

type CollectionName = keyof typeof collectionModelMap;
type ModelName = (typeof collectionModelMap)[CollectionName];
// type ModelName = Uncapitalize<Prisma.ModelName>;

// test
type User = Prisma.Product$reviewsArgs;

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

  async find<T>(
    collection: CollectionName,
    normQuery: INormQuery
  ): Promise<T[]> {
    const q = this.query<T>(normQuery);

    return await this.dbClient[collectionModelMap[collection]].findMany(q);
  }

  async findOne<T>(
    collection: CollectionName,
    normQuery: INormQuery
  ): Promise<T | null> {
    const q = this.query<T>(normQuery);

    // @ts-ignore
    return await this.dbClient[collectionModelMap[collection]].findFirst(q);
  }

  async findById<T>(
    collection: CollectionName,
    id: EntityId
  ): Promise<T | null> {
    return this.findOne<T>(collection, { filter: { id } });
  }

  async create<T>(collection: CollectionName, data: T): Promise<T> {
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
    collection: CollectionName,
    id: EntityId,
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

  async delete(collection: CollectionName, id: EntityId): Promise<boolean> {
    const result = await this.dbClient[
      collectionModelMap[collection]
    ].deleteMany({
      where: { id },
    });

    return !!result.count;
  }

  async deleteMany(
    collection: CollectionName,
    normQuery: INormQuery
  ): Promise<number> {
    await this.dbClient.$executeRawUnsafe(`PRAGMA foreign_keys = OFF;`);

    const result =
      await this.dbClient[collectionModelMap[collection]].deleteMany();
    return result.count;
  }

  async count<T>(
    collection: CollectionName,
    normQuery: INormQuery
  ): Promise<number> {
    const q = this.query<T>(normQuery);

    // @ts-ignore
    return await this.dbClient[collectionModelMap[collection]].count(q);
  }

  async createDB(identifier: string) {
    // done via cli
  }

  override async migrate() {
    // migration is done via prisma cli
    console.log(`Migration is not necessary for Prisma. It's done via cli.`);
    // this.createDB(config.database_name);
  }

  private async query<T>(normQuery: INormQuery) {
    const { pagination, orderBy, filter } = normQuery;
    return {
      ...this.buildPagination(pagination),
      ...this.buildSorting(orderBy),
      ...this.buildFilter(filter),
    };
  }

  private buildPagination(pagination?: Pagination): {
    take?: number;
    skip?: number;
  } {
    if (!pagination) return {};
    return {
      take: pagination.per_page,
      skip: pagination.offset,
    };
  }

  private buildSorting(orderBy?: OrderBy): {
    orderBy?: Record<string, "asc" | "desc">;
  } {
    if (!orderBy) return {};
    return {
      orderBy: { [orderBy.sort]: orderBy.direction },
    };
  }

  private buildFilter(filter?: Filter): { where?: Record<string, any> } {
    if (!filter) return {};
    const where: Record<string, any> = {};
    for (const [key, value] of Object.entries(filter)) {
      where[key] = Array.isArray(value) ? { in: value } : value;
    }
    return { where };
  }
}
