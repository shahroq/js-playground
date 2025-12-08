import { PrismaClient, Prisma } from "@/generated/prisma/client";
import type {
  ProductDelegate,
  ReviewDelegate,
  UserDelegate,
} from "@/generated/prisma/models";
import { config, utils } from "@/common/container";
import type { IDBAdapter } from "./db-adapter.interface";
import type { EntityId, CollectionName } from "@/common/types";
import type {
  INormQuery,
  Pagination,
  OrderBy,
  Filter,
  Selection,
} from "@/common/query-object/types";

const collectionModelMap: Record<
  CollectionName,
  Uncapitalize<Prisma.ModelName>
> = {
  products: "product",
  reviews: "review",
  users: "user",
} as const;

type ModelName = (typeof collectionModelMap)[CollectionName];
// type ModelName = Uncapitalize<Prisma.ModelName>;
type ModelDelegate = ProductDelegate | ReviewDelegate | UserDelegate;

export class PrismaDBAdapter implements IDBAdapter {
  private dbClient: PrismaClient;
  private userId: number;

  constructor() {
    // Prisma will use the DATABASE_URL from .env
    // Example: DATABASE_URL=“mysql://user:password@localhost:3306/mydb”
    // Or: DATABASE_URL=“file:./data.db”
    this.dbClient = new PrismaClient();
    this.userId = config.user_id;
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
    const m = this.getModel(collection);

    // @ts-ignore
    return await m.findMany(q);
  }

  async findOne<T>(
    collection: CollectionName,
    normQuery: INormQuery
  ): Promise<T | null> {
    const q = this.query<T>(normQuery);
    const m = this.getModel(collection);

    // @ts-ignore
    return await m.findFirst(q);
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
      created_at: utils.formatISO(),
      created_by: this.userId,
      updated_by: this.userId,
    };
    const m = this.getModel(collection);

    // @ts-ignore
    return await m.create({
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
      updated_at: utils.formatISO(),
      updated_by: this.userId,
    };

    const m = this.getModel(collection);

    // @ts-ignore
    return await m.update({
      where: { id },
      data: updatedItem,
    });
  }

  async delete<T>(collection: CollectionName, id: EntityId): Promise<boolean> {
    const m = this.getModel(collection);

    // @ts-ignore
    const result = m.deleteMany({ where: { id } });

    return !!result.count;
  }

  async deleteMany<T>(
    collection: CollectionName,
    normQuery: INormQuery
  ): Promise<number> {
    await this.dbClient.$executeRawUnsafe(`PRAGMA foreign_keys = OFF;`);
    const m = this.getModel(collection);

    // @ts-ignore
    const result = await m.deleteMany();
    return result.count;
  }

  async count<T>(
    collection: CollectionName,
    normQuery: INormQuery
  ): Promise<number> {
    const q = this.query<T>(normQuery, false, false, false);
    const m = this.getModel(collection);

    // @ts-ignore
    return await m.count(q);
  }

  async avg<T>(
    collection: CollectionName,
    normQuery: INormQuery,
    field: keyof T & string
  ): Promise<number | null> {
    const q = this.query<T>(normQuery, false, false, false);
    const m = this.getModel(collection);

    // @ts-ignore
    const result = await m.aggregate({
      ...q,
      _avg: { [field]: true },
    });

    return result._avg[field] ?? null;
  }

  async createDB(identifier: string) {
    // done via cli
  }

  async migrate() {
    // migration is done via prisma cli
    console.log(`Migration is not necessary for Prisma. It's done via cli.`);
    // this.createDB(config.database_name);
  }

  private getModel(collection: CollectionName): ModelDelegate {
    return this.dbClient[collectionModelMap[collection]];
  }

  private query<T>(
    normQuery: INormQuery,
    includePagination: boolean = true,
    includeSorting: boolean = true,
    includeSelection: boolean = true
  ) {
    const { pagination, orderBy, filter, selection } = normQuery;
    return {
      ...(includePagination ? this.buildPagination(pagination) : {}),
      ...(includeSorting ? this.buildSorting(orderBy) : {}),
      ...this.buildFilter(filter),
      ...(includeSelection ? this.buildSelection(selection) : {}),
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

  private buildSelection(selection?: Selection): {
    select?: Record<string, boolean>;
  } {
    if (!selection || !selection.fields || selection.fields.length === 0) {
      return {};
    }

    // Convert array of fields to Prisma select object
    const select: Record<string, boolean> = {};
    for (const field of selection.fields) {
      select[field] = true;
    }

    return { select };
  }
}
