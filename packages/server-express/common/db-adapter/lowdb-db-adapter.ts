import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import fs from "fs-extra";
import { config, utils } from "@/common/container";
import { defaultData, type DatabaseSchema } from "@/data/lowdb-json/schema";
import type { IDBAdapter } from "./db-adapter.interface";

export class LowDBDBAdapter implements IDBAdapter {
  private dbClient: Low<DatabaseSchema>;
  private filePath = config.database_path ?? "";
  private defaultData: DatabaseSchema = defaultData;
  private userId: number;

  constructor() {
    const adapter = new JSONFile<DatabaseSchema>(this.filePath);
    this.dbClient = new Low(adapter, this.defaultData);
    this.userId = config.user_id;
  }

  async connect(): Promise<void> {
    // Ensure file exists before LowDB tries to read it
    await fs.ensureFile(this.filePath);
    const adapter = new JSONFile<DatabaseSchema>(this.filePath);
    this.dbClient = new Low(adapter, this.defaultData);
    console.log(
      `🌕 Connected to LowDB: ${utils.truncateString(this.filePath, {
        position: "start",
      })}`
    );
  }

  async disconnect(): Promise<void> {
    await this.dbClient.write();
    console.log("🌒 LowDB disconnected");
  }

  async find<T>(collection: string, filter: QueryFilter<T> = {}): Promise<T[]> {
    await this.dbClient.read();
    let items = (this.dbClient.data[collection] || []) as T[];

    if (filter.where) {
      if (typeof filter.where === "function") {
        items = items.filter(filter.where);
      } else {
        items = items.filter((item) => {
          return Object.entries(filter.where as object).every(
            ([key, value]) => {
              return (item as any)[key] === value;
            }
          );
        });
      }
    }

    if (filter.orderBy) {
      const { field, direction } = filter.orderBy;
      items.sort((a, b) => {
        const aVal = a[field];
        const bVal = b[field];
        if (aVal < bVal) return direction === "asc" ? -1 : 1;
        if (aVal > bVal) return direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    if (filter.offset !== undefined) {
      items = items.slice(filter.offset);
    }

    if (filter.per_page !== undefined) {
      items = items.slice(0, filter.per_page);
    }

    return items;
  }

  async findOne<T>(
    collection: string,
    filter: QueryFilter<T>
  ): Promise<T | null> {
    const results = await this.find(collection, { ...filter, per_page: 1 });
    return results[0] || null;
  }

  /*
  async findAll<T>(collection: string): Promise<T[]> {
    await this.dbClient.read();
    return (this.dbClient.data[collection] || []) as T[];
  }
  */

  async findById<T>(
    collection: string,
    id: string | number
  ): Promise<T | null> {
    await this.dbClient.read();
    const items = this.dbClient.data[collection] || [];
    return items.find((item: any) => item.id === id) || null;
  }

  async create<T extends { id?: any }>(
    collection: string,
    data: T
  ): Promise<T> {
    await this.dbClient.read();

    if (!this.dbClient.data[collection]) this.dbClient.data[collection] = [];

    const newItem = {
      ...data,
      id: data.id || this.dbClient.data[collection].length + 1,
      created_at: utils.formatISO(),
      updated_at: utils.formatISO(),
      created_by: this.userId,
      updated_by: this.userId,
    };
    this.dbClient.data[collection].push(newItem);
    await this.dbClient.write();

    return { ...newItem } as T;
  }

  async update<T>(
    collection: string,
    id: string | number,
    data: Partial<T>
  ): Promise<T | null> {
    await this.dbClient.read();

    const items = this.dbClient.data[collection] || [];
    const index = items.findIndex((item: any) => item.id === id);

    if (index === -1) return null;

    items[index] = {
      ...items[index],
      ...data,
      updated_at: utils.formatISO(),
      updated_by: this.userId,
    };
    await this.dbClient.write();

    return { ...items[index] };
  }

  async delete(collection: string, id: string | number): Promise<boolean> {
    await this.dbClient.read();
    const items = this.dbClient.data[collection] || [];
    const index = items.findIndex((item: any) => item.id === id);

    if (index === -1) return false;

    items.splice(index, 1);
    await this.dbClient.write();

    return true;
  }

  async deleteMany<T>(
    collection: string,
    filter: QueryFilter<T> = {}
  ): Promise<number> {
    console.log(collection);
    await this.dbClient.read(); // ensure fresh data
    console.log(this.dbClient.data);
    /*
    // Get the collection (e.g., users, products, etc.)
    const items: T[] = this.db.data?.[collection] || [];
    console.log(items);
    // Keep only items that do NOT match the filter
    const remaining = items.filter((item) => {
      // return true if item should be kept
      return !Object.entries(filter).every(
        ([key, value]) => item[key] === value
      );
    });

    // Count how many were deleted
    const deletedCount = items.length - remaining.length;

    // Write updated data back

    this.db.data[collection] = remaining;

    await this.db.write();

    return deletedCount;
    */
  }

  async count<T>(collection: string, filter?: QueryFilter<T>): Promise<number> {
    if (!filter || !filter.where) {
      await this.dbClient.read();
      return (this.dbClient.data[collection] || []).length;
    }
    const results = await this.find(collection, filter);
    return results.length;
  }

  async createDB(identifier: string) {
    // Creates an empty file if not exist:
    await fs.ensureFile(identifier);

    // main file
    try {
      // file exists
      await this.dbClient.read(); // even if file
    } catch (err) {
      // file not exist, create it with defaultData
      console.warn(
        `⚠️ Lowdb read failed, initializing DB file (${identifier}) with default data...`
      );
      this.dbClient.data = this.defaultData;
      await this.dbClient.write();
      await this.dbClient.read();
    }

    // copy main file, for test
    // TODO: do something about it
    const dest = this.filePath.replace(/(\.[^/.]+)$/, "-test$1");
    if (!fs.pathExistsSync(dest)) {
      await fs.copy(identifier, dest);
      console.log("Test file created successfully!");
    }
  }

  override async migrate() {
    await super.migrate();
    // TODO: do something about creating test db/ maybe duplicate?
    await this.createDB(this.filePath);
  }
}
