import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import fs from "fs-extra";
import { BaseAdapter, type QueryFilter } from "../base-adapter";
import config from "@/common/config";
import { isoString, truncateString } from "@/common/utils";
import { defaultData, type DatabaseSchema } from "./schema";

export class LowDBJSONAdapter extends BaseAdapter {
  private db: Low<DatabaseSchema>;
  private filePath = config.database_path;
  private defaultData: DatabaseSchema = defaultData;

  constructor() {
    super();
    const adapter = new JSONFile<DatabaseSchema>(this.filePath);
    this.db = new Low(adapter, this.defaultData);
  }

  async connect(): Promise<void> {
    // Ensure file exists before LowDB tries to read it
    await fs.ensureFile(this.filePath);
    const adapter = new JSONFile<DatabaseSchema>(this.filePath);
    this.db = new Low(adapter, this.defaultData);
    console.log(
      `🌕 Connected to LowDB: ${truncateString(this.filePath, {
        position: "start",
      })}`
    );
  }

  async disconnect(): Promise<void> {
    await this.db.write();
    console.log("🌒 LowDB disconnected");
  }

  async findAll<T>(collection: string): Promise<T[]> {
    await this.db.read();
    return (this.db.data[collection] || []) as T[];
  }

  async findById<T>(
    collection: string,
    id: string | number
  ): Promise<T | null> {
    await this.db.read();
    const items = this.db.data[collection] || [];
    return items.find((item: any) => item.id === id) || null;
  }

  async create<T extends { id?: any }>(
    collection: string,
    data: T
  ): Promise<T> {
    await this.db.read();

    if (!this.db.data[collection]) this.db.data[collection] = [];

    const newItem = {
      ...data,
      id: data.id || this.db.data[collection].length + 1,
      created_at: isoString(),
      updated_at: isoString(),
      created_by: 1,
      updated_by: 1,
    };
    this.db.data[collection].push(newItem);
    await this.db.write();

    return { ...newItem } as T;
  }

  async update<T>(
    collection: string,
    id: string | number,
    data: Partial<T>
  ): Promise<T | null> {
    await this.db.read();

    const items = this.db.data[collection] || [];
    const index = items.findIndex((item: any) => item.id === id);

    if (index === -1) return null;

    items[index] = {
      ...items[index],
      ...data,
      updated_at: isoString(),
      updated_by: 1,
    };
    await this.db.write();

    return { ...items[index] };
  }

  async delete(collection: string, id: string | number): Promise<boolean> {
    await this.db.read();
    const items = this.db.data[collection] || [];
    const index = items.findIndex((item: any) => item.id === id);

    if (index === -1) return false;

    items.splice(index, 1);
    await this.db.write();

    return true;
  }

  async deleteMany<T>(
    collection: string,
    filter: QueryFilter<T> = {}
  ): Promise<number> {
    console.log(collection);
    await this.db.read(); // ensure fresh data
    console.log(this.db.data);
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

  async find<T>(collection: string, filter: QueryFilter<T> = {}): Promise<T[]> {
    await this.db.read();
    let items = (this.db.data[collection] || []) as T[];

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

    if (filter.limit !== undefined) {
      items = items.slice(0, filter.limit);
    }

    return items;
  }

  async findOne<T>(
    collection: string,
    filter: QueryFilter<T>
  ): Promise<T | null> {
    const results = await this.find(collection, { ...filter, limit: 1 });
    return results[0] || null;
  }

  async count<T>(collection: string, filter?: QueryFilter<T>): Promise<number> {
    if (!filter || !filter.where) {
      await this.db.read();
      return (this.db.data[collection] || []).length;
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
      await this.db.read(); // even if file
    } catch (err) {
      // file not exist, create it with defaultData
      console.warn(
        `⚠️ Lowdb read failed, initializing DB file (${identifier}) with default data...`
      );
      this.db.data = this.defaultData;
      await this.db.write();
      await this.db.read();
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
