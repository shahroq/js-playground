import { PrismaClient, Prisma } from "@/generated/prisma/client";
import type {
  ProductDelegate,
  ReviewDelegate,
  UserDelegate,
} from "@/generated/prisma/models";
import { AppQuery, config } from "@/common/container";
import { buildAuditFields, type IDBAdapter } from "./db-adapter.interface";
import type { EntityId, CollectionName } from "@/common/types";
import type {
  Pagination,
  OrderBy,
  Filter,
  Selection,
} from "@/common/app-query/types";

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

    // prisma options
    let options = {};
    // log the query for debugging
    if (config.debug_orm)
      options = { ...options, log: ["query", "info", "warn", "error"] };

    this.dbClient = new PrismaClient(options);
    this.userId = +config.user_id;
  }

  async connect(): Promise<void> {
    await this.dbClient.$connect();
    await this.dbClient.$executeRawUnsafe(`PRAGMA foreign_keys = OFF;`);

    console.log("🌕 Prisma connected");
  }

  async disconnect() {
    await this.dbClient.$disconnect();
    console.log("🌒 Prisma disconnected");
  }

  private getModel(collection: CollectionName): ModelDelegate {
    return this.dbClient[collectionModelMap[collection]];
  }

  async findAll<T>(collection: CollectionName, appQuery: AppQuery) {
    const q = this.query<T>(appQuery);
    const m = this.getModel(collection);

    // @ts-ignore
    return await m.findMany(q);
  }

  async findOne<T>(collection: CollectionName, appQuery: AppQuery) {
    appQuery.append({ per_page: 1 });

    const q = this.query<T>(appQuery);
    const m = this.getModel(collection);

    // @ts-ignore
    return await m.findFirst(q);
  }

  async findById<T>(collection: CollectionName, id: EntityId) {
    return this.findOne<T>(collection, new AppQuery({ id }));
  }

  async create<T>(collection: CollectionName, data: T) {
    const m = this.getModel(collection);

    const newItem = {
      ...data,
      ...buildAuditFields(["created_at", "created_by", "updated_by"], {
        userId: this.userId,
      }),
    };

    // @ts-ignore
    return await m.create({
      data: newItem,
    });
  }

  async update<T>(collection: CollectionName, id: EntityId, data: Partial<T>) {
    const m = this.getModel(collection);

    // first check if exists
    // TODO: consider status
    const existing = await this.findById<T>(collection, id);
    if (!existing) return null;

    const updatedItem = {
      ...data,
      ...buildAuditFields(["updated_at", "updated_by"], {
        userId: this.userId,
      }),
    };

    // @ts-ignore
    return await m.update({
      where: { id },
      data: updatedItem,
    });
  }

  async delete<T>(collection: CollectionName, id: EntityId) {
    const m = this.getModel(collection);

    // @ts-ignore
    const result = await m.deleteMany({ where: { id } });

    return !!result.count;
  }

  async deleteMany<T>(collection: CollectionName, appQuery: AppQuery) {
    await this.dbClient.$executeRawUnsafe(`PRAGMA foreign_keys = OFF;`);
    const q = this.query<T>(appQuery);
    const m = this.getModel(collection);

    // @ts-ignore
    const result = await m.deleteMany();
    return result.count;
  }

  async count<T>(collection: CollectionName, appQuery: AppQuery) {
    const q = this.query<T>(appQuery, false, false, false);
    const m = this.getModel(collection);

    // @ts-ignore
    return await m.count(q);
  }

  async avg<T>(
    collection: CollectionName,
    appQuery: AppQuery,
    field: keyof T & string
  ) {
    const q = this.query<T>(appQuery, false, false, false);
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

  private query<T>(
    appQuery: AppQuery,
    includePagination: boolean = true,
    includeSorting: boolean = true,
    includeSelection: boolean = true
  ) {
    const { pagination, orderBy, filter, selection } = appQuery.normQuery;
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
