import { PrismaClient } from "@/generated/prisma/client";
import { BaseAdapter, type QueryFilter } from "@/data/base-adapter";
import { isoString } from "@/core/utils";

const collectionMap = {
  products: "Product",
  reviews: "Review",
  users: "User",
};

export class PrismaSQLiteAdapter extends BaseAdapter {
  private prisma: PrismaClient;

  constructor() {
    super();

    // Prisma will use the DATABASE_URL from .env
    // Example: DATABASE_URL=“mysql://user:password@localhost:3306/mydb”
    // Or: DATABASE_URL=“file:./database.db”
    this.prisma = new PrismaClient();
  }

  async connect(): Promise<void> {
    await this.prisma.$connect();
    await this.prisma.$executeRawUnsafe(`PRAGMA foreign_keys = OFF;`);

    console.log("🌕 Prisma connected");
  }

  async disconnect(): Promise<void> {
    await this.prisma.$disconnect();
    console.log("🌒 Prisma disconnected");
  }

  async findAll<T>(collection: string): Promise<T[]> {
    // @ts-ignore - Dynamic collection access
    return await this.prisma[collectionMap[collection]].findMany();
  }

  async findById<T>(
    collection: string,
    id: string | number
  ): Promise<T | null> {
    return await this.prisma[collectionMap[collection]].findUnique({
      where: { id },
    });
  }

  async create<T>(collection: string, data: T): Promise<T> {
    // @ts-ignore
    const newItem = {
      ...data,
      created_at: isoString(),
      created_by: 1,
      updated_by: 1,
    };
    // console.log("newItem: " + newItem);

    return await this.prisma[collectionMap[collection]].create({
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

    return await this.prisma[collectionMap[collection]].update({
      where: { id },
      data: updatedItem,
    });
  }

  async delete(collection: string, id: string | number): Promise<boolean> {
    const deleted = await this.prisma[collectionMap[collection]].delete({
      where: { id },
    });
    return !!deleted;
  }

  async deleteMany<T>(
    collection: string,
    filter: QueryFilter<T> = {}
  ): Promise<number> {
    await this.prisma.$executeRawUnsafe(`PRAGMA foreign_keys = OFF;`);

    const result = await this.prisma[collectionMap[collection]].deleteMany();
    return result.count;
  }

  async deleteMany0<T>(
    collection: string,
    filter: QueryFilter<T> = {}
  ): Promise<T[]> {
    /*
    const dbUrl = process.env.DATABASE_URL;
    if (dbUrl && dbUrl.startsWith("file:")) {
      const dbPath = dbUrl.replace("file:", "");
      try {
        await fs.remove(dbPath);
        console.log("Database file removed for reset:", dbPath);
        return true;
      } catch (error) {
        console.error("Error removing database file:", error);
        return false;
      }
    }
    console.warn("Reset is only supported for file-based databases.");
    return false;
    */
  }

  async find<T>(collection: string, filter: QueryFilter<T> = {}): Promise<T[]> {
    const query: any = {};

    // Convert where filter to Prisma format
    if (filter.where && typeof filter.where !== "function") {
      query.where = filter.where;
    }

    // Ordering
    if (filter.orderBy) {
      query.orderBy = {
        [filter.orderBy.field as string]: filter.orderBy.direction,
      };
    }

    // Pagination
    if (filter.limit) query.take = filter.limit;
    if (filter.offset) query.skip = filter.offset;

    // @ts-ignore
    return await this.prisma[collectionMap[collection]].findMany(query);
  }

  async findOne<T>(
    collection: string,
    filter: QueryFilter<T>
  ): Promise<T | null> {
    const query: any = {};

    if (filter.where && typeof filter.where !== "function") {
      query.where = filter.where;
    }

    // @ts-ignore
    return await this.prisma[collectionMap[collection]].findFirst(query);
  }

  async count<T>(collection: string, filter?: QueryFilter<T>): Promise<number> {
    const query: any = {};

    if (filter?.where && typeof filter.where !== "function") {
      query.where = filter.where;
    }

    // @ts-ignore
    return await this.prisma[collectionMap[collection]].count(query);
  }

  async createDB(identifier: string) {
    // done via cli
  }

  override async migrate() {
    await super.migrate();

    // migration is done via prisma cli
    console.log(`Migration is not necessary for Prisma. It's done via cli.`);
    // this.createDB(config.database_name);
  }
}
