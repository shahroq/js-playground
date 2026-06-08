import { PrismaClient, Prisma } from "@root/generated/prisma/client";
import { config } from "@/common/container";
import type { EntityId, CollectionName } from "@/common/types";
import type { QueryObject } from "@/common/query-object/types";
import type {
  ProductDelegate,
  ReviewDelegate,
  UserDelegate,
} from "@root/generated/prisma/models";
import {
  buildAuditFields,
  type IDbClientService,
} from "../db-client-service.interface";

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

export class PrismaService implements IDbClientService {
  private dbClient: PrismaClient;
  private userId: number;

  constructor() {
    // Prisma will use the DATABASE_URL from .env
    // Example: DATABASE_URL=“mysql://user:password@localhost:3306/mydb”
    // Or: DATABASE_URL=“file:./data.db”

    // prisma options
    let options = {};
    // log the query for debugging
    if (config.debug.show_executed_sql)
      options = { ...options, log: ["query", "info", "warn", "error"] };

    this.dbClient = new PrismaClient(options);
    this.userId = config.default.user_id;
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
    // @ts-ignore
    return this.dbClient[collectionModelMap[collection]];
  }

  async findAll<T>(collection: CollectionName, queryObject: QueryObject) {
    const m = this.getModel(collection);
    const q = this.query<T>(queryObject);

    // @ts-ignore
    return await m.findMany(q);
  }

  async findOne<T>(collection: CollectionName, queryObject: QueryObject) {
    const m = this.getModel(collection);
    const q = this.query<T>(queryObject);

    // @ts-ignore
    return await m.findFirst(q);
  }

  async findById<T>(collection: CollectionName, id: EntityId) {
    const m = this.getModel(collection);
    const q = this.query<T>({ filter: { id } });

    // @ts-ignore
    return await m.findFirst(q);
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
      where: { id: id },
      data: updatedItem,
    });
  }

  async delete(collection: CollectionName, id: EntityId) {
    const m = this.getModel(collection);

    // @ts-ignore
    const result = await m.deleteMany({ where: { id } });

    return !!result.count;
  }

  async deleteMany<T>(collection: CollectionName, queryObject: QueryObject) {
    await this.dbClient.$executeRawUnsafe(`PRAGMA foreign_keys = OFF;`);
    const q = this.query<T>(queryObject);
    const m = this.getModel(collection);

    // @ts-ignore
    const result = await m.deleteMany(q);
    return result.count;
  }

  async count<T>(collection: CollectionName, queryObject: QueryObject) {
    // const q = this.query<T>(appQuery, false, false, false);
    const q = this.query<T>(queryObject, false, false, false);
    const m = this.getModel(collection);

    // @ts-ignore
    return await m.count(q);
  }

  async avg<T>(
    collection: CollectionName,
    queryObject: QueryObject,
    field: keyof T & string
  ) {
    const q = this.query<T>(queryObject, false, false, false);
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
    // this.createDB(config.database.name);
  }

  private query<T>(
    queryObject: QueryObject,
    includeFields: boolean = true,
    includePage: boolean = true,
    includeSort: boolean = true
  ): Prisma.SelectSubset<Prisma.PostFindManyArgs, Prisma.PostFindManyArgs> {
    // const { include, fields, page, sort, filter } = queryObject;
    // build query

    const prismaQuery: Prisma.PostFindManyArgs = {};

    // Include: Join
    /*
    if (!queryObject.include && queryObject.include.length > 0) {
      prismaQuery.include = Object.fromEntries(
        queryObject.include.map((relation) => [relation, true])
      );
    }
    */

    // Fields: SELECT
    if (includeFields && queryObject.fields && queryObject.fields.length > 0) {
      prismaQuery.select = Object.fromEntries(
        queryObject.fields.map((field) => [field, true])
      );
    }

    // Page: Limit
    if (includePage && queryObject.page) {
      prismaQuery.skip = (queryObject.page.number - 1) * queryObject.page.size;
      prismaQuery.take = queryObject.page.size;
    }

    // Sort: ORDER BY
    if (includeSort && queryObject.sort && queryObject.sort.length > 0) {
      prismaQuery.orderBy = queryObject.sort.map((s) => ({
        [s.field]: s.direction,
      }));
    }

    // Filter: WHERE
    if (queryObject.filter && Object.keys(queryObject.filter).length > 0) {
      prismaQuery.where = queryObject.filter;
    }

    return prismaQuery;
  }
}
