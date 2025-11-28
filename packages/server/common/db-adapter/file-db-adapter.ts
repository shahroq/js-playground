import fs from "fs-extra";
import config from "@/common/config";
import { isoString, truncateString } from "@/common/utils/utils";
import { defaultData, type DatabaseSchema } from "@/data/file-json/schema";
import type { IDBAdapter } from "./db-adapter.interface";

export class FileDBAdapter implements IDBAdapter {
  private db: DatabaseSchema = {};
  private filePath = config.database_path ?? "";
  private defaultData: DatabaseSchema = defaultData;

  constructor() {}

  async connect(): Promise<void> {
    await fs.ensureFile(this.filePath);
    await this.readFile();
    console.log(
      `🌕 Connected to FS JSON: ${truncateString(this.filePath, {
        position: "start",
      })}`
    );
  }

  async disconnect(): Promise<void> {
    await this.writeFile();
    console.log("🌒 FS JSON disconnected");
  }

  /*
  async findAll<T>(collection: string): Promise<T[]> {
    await this.readFile();
    return (this.data[collection] || []) as T[];
  }
  */

  async find<T>(collection: string, filter: QueryFilter<T> = {}): Promise<T[]> {
    await this.readFile();
    let items = (this.data[collection] || []) as T[];

    if (filter.where) {
      if (typeof filter.where === "function") {
        items = items.filter(filter.where);
      } else {
        items = items.filter((item) =>
          Object.entries(filter.where as object).every(
            ([key, value]) => (item as any)[key] === value
          )
        );
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

    if (filter.offset !== undefined) items = items.slice(filter.offset);
    if (filter.per_page !== undefined) items = items.slice(0, filter.per_page);

    return items;
  }

  async findOne<T>(
    collection: string,
    filter: QueryFilter<T>
  ): Promise<T | null> {
    const results = await this.find(collection, { ...filter, per_page: 1 });
    return results[0] || null;
  }

  async findById<T>(
    collection: string,
    id: string | number
  ): Promise<T | null> {
    await this.readFile();
    const items = this.data[collection] || [];
    return items.find((item: any) => item.id === id) || null;
  }

  async create<T extends { id?: any }>(
    collection: string,
    data: T
  ): Promise<T> {
    await this.readFile();
    if (!this.data[collection]) this.data[collection] = [];

    const newItem = {
      ...data,
      id: data.id ?? this.getNextId(collection),
      created_at: isoString(),
      updated_at: isoString(),
      created_by: 1,
      updated_by: 1,
    };
    (this.data[collection] as any[]).push(newItem);
    await this.writeFile();

    return { ...newItem } as T;
  }

  async update<T>(
    collection: string,
    id: string | number,
    data: Partial<T>
  ): Promise<T | null> {
    await this.readFile();
    const items = this.data[collection] || [];
    const index = items.findIndex((item: any) => item.id === id);

    if (index === -1) return null;

    items[index] = {
      ...items[index],
      ...data,
      updated_at: isoString(),
      updated_by: 1,
    };
    await this.writeFile();

    return { ...items[index] };
  }

  async delete(collection: string, id: string | number): Promise<boolean> {
    await this.readFile();
    const items = this.data[collection] || [];
    const index = items.findIndex((item: any) => item.id === id);

    if (index === -1) return false;

    items.splice(index, 1);
    await this.writeFile();
    return true;
  }

  async deleteMany<T>(
    collection: string,
    filter: QueryFilter<T> = {}
  ): Promise<number> {
    await this.readFile();

    const items: T[] = this.data[collection] || [];
    const remaining = items.filter(
      (item) =>
        !Object.entries(filter).every(
          ([key, value]) => (item as any)[key] === value
        )
    );
    const deletedCount = items.length - remaining.length;

    this.data[collection] = remaining;
    await this.writeFile();
    return deletedCount;
  }

  async count<T>(collection: string, filter?: QueryFilter<T>): Promise<number> {
    if (!filter || !filter.where) {
      await this.readFile();
      return (this.data[collection] || []).length;
    }
    const results = await this.find(collection, filter);
    return results.length;
  }

  async createDB(identifier: string) {
    // Creates an empty file if not exist:
    await fs.ensureFile(identifier);

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

  private async readFile(): Promise<void> {
    try {
      this.data = await fs.readJson(this.filePath);
    } catch {
      this.data = { ...this.defaultData };
      await this.writeFile();
    }
  }

  private async writeFile(): Promise<void> {
    this.touchMeta();
    await fs.writeJson(this.filePath, this.data, { spaces: 2 });
  }

  private touchMeta(): void {
    this.data = {
      ...this.data,
      meta: {
        ...this.data.meta,
        updated_at: isoString(),
      },
    };
  }

  private getNextId(collection: string): number {
    const items = this.data[collection] || [];
    if (items.length === 0) return 1;

    // Find the maximum existing numeric ID and increment
    const maxId = items
      .map((item: any) => Number(item.id))
      .filter((id) => !isNaN(id))
      .reduce((max, id) => Math.max(max, id), 0);

    return maxId + 1;
  }
}
