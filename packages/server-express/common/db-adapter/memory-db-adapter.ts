import data from "@/data/memory-json/data.json";
import { config, utils } from "@/common/container";
import type { IDBAdapter } from "./db-adapter.interface";
import type { EntityId, CollectionName } from "@/common/types";
import type { INormQuery } from "@/common/query-object/types";

export class MemoryDBAdapter implements IDBAdapter {
  private dbClient;
  private userId: number;

  constructor() {
    this.dbClient = data;
    this.userId = config.user_id;
  }

  connect(): void {
    console.log(`🌕 Fetching initial data from json file`);
  }

  disconnect(): void {
    //
  }

  find<T>(collection: CollectionName, normQuery: INormQuery): T[] {
    const m = this.getModel(collection);

    const items = m;
    return items;
  }

  findOne<T>(collection: CollectionName, normQuery: INormQuery): T | null {
    const m = this.getModel(collection);
    const id = normQuery.filter?.id;

    const item = m.find((item) => item.id == id);
    if (!item) return null;

    return item;
  }

  findById<T>(collection: CollectionName, id: EntityId): T | null {
    return this.findOne<T>(collection, { filter: { id } });
  }

  create<T>(collection: CollectionName, data: T): T {
    const m = this.getModel(collection);
    const newItem = {
      ...data,
      created_at: utils.formatISO(),
      updated_at: utils.formatISO(),
      created_by: this.userId,
      updated_by: this.userId,
    };

    m.push(newItem);
    return newItem;
  }

  update<T>(
    collection: CollectionName,
    id: EntityId,
    data: Partial<T>
  ): T | null {
    const m = this.getModel(collection);

    const itemIndex = m.findIndex((item) => item.id === id);
    if (itemIndex < 0) throw Error("Couldn't find the item.");

    const updatedItem = {
      ...m[itemIndex],
      ...data,
      updated_at: utils.formatISO(),
      updated_by: this.userId,
    };

    m[itemIndex] = updatedItem;

    return updatedItem;
  }

  delete<T>(collection: CollectionName, id: EntityId): boolean {
    const m = this.getModel(collection);

    const itemIndex = m.findIndex((item) => item.id === id);
    if (itemIndex < 0) throw Error("Couldn't find the item.");

    m.splice(itemIndex, 1);

    return true;
  }

  deleteMany<T>(collection: CollectionName, normQuery: INormQuery): number {
    const m = this.getModel(collection);

    const deletedCount = m.length;

    return deletedCount;
  }

  count<T>(collection: CollectionName, normQuery: INormQuery): number {
    const m = this.getModel(collection);
    return m.length;
  }

  avg<T>(
    collection: CollectionName,
    normQuery: INormQuery,
    field: keyof T & string
  ): number | null {
    const m = this.getModel(collection);

    let sum = 0;
    let count = 0;

    for (const item of m) {
      const value = (item as any)[field];
      if (typeof value === "number") {
        sum += value;
        count++;
      }
    }
    return count === 0 ? null : sum / count;
  }

  createDB(identifier: string) {
    // done via cli
  }

  migrate() {
    //
  }

  private getModel(collection: CollectionName) {
    return this.dbClient[collection];
  }
}
