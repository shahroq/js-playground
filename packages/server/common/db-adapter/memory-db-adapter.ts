import data from "@/data/memory-json/data.json";
import { utils } from "@/common/container";
import type { IDBAdapter } from "./db-adapter.interface";
import type { EntityId, CollectionName } from "@/common/types";
import type { INormQuery } from "@/common/query-object/types";

export class MemoryDBAdapter implements IDBAdapter {
  private dbClient;

  constructor() {
    this.dbClient = data;
  }

  async connect(): Promise<void> {
    console.log(`🌕 Fetching initial data from json file`);
  }

  async disconnect(): Promise<void> {
    //
  }

  async find<T>(
    collection: CollectionName,
    normQuery: INormQuery
  ): Promise<T[]> {
    const m = this.getModel(collection);

    const items = await m;
    return items;
  }

  async findOne<T>(
    collection: CollectionName,
    normQuery: INormQuery
  ): Promise<T | null> {
    const m = this.getModel(collection);
    const id = normQuery.filter?.id;

    const item = m.find((item) => item.id == id);
    if (!item) return null;

    return item;
  }

  async findById<T>(
    collection: CollectionName,
    id: EntityId
  ): Promise<T | null> {
    return this.findOne<T>(collection, { filter: { id } });
  }

  async create<T>(collection: CollectionName, data: T): Promise<T> {
    const m = this.getModel(collection);
    const newItem = {
      ...data,
      created_at: utils.formatISO(),
      updated_at: utils.formatISO(),
      created_by: 1,
      updated_by: 1,
    };

    m.push(newItem);
    return newItem;
  }

  async update<T>(
    collection: CollectionName,
    id: EntityId,
    data: Partial<T>
  ): Promise<T | null> {
    const m = this.getModel(collection);

    const itemIndex = m.findIndex((item) => item.id === id);
    if (itemIndex < 0) throw Error("Couldn't find the item.");

    const updatedItem = {
      ...m[itemIndex],
      ...data,
      updated_at: utils.formatISO(),
      updated_by: 3,
    };

    m[itemIndex] = updatedItem;

    return updatedItem;
  }

  async delete<T>(collection: CollectionName, id: EntityId): Promise<boolean> {
    const m = this.getModel(collection);

    const itemIndex = m.findIndex((item) => item.id === id);
    if (itemIndex < 0) throw Error("Couldn't find the item.");

    m.splice(itemIndex, 1);

    return true;
  }

  async deleteMany<T>(
    collection: CollectionName,
    normQuery: INormQuery
  ): Promise<number> {
    const m = this.getModel(collection);

    const deletedCount = m.length;

    return deletedCount;
  }

  async count<T>(
    collection: CollectionName,
    normQuery: INormQuery
  ): Promise<number> {
    const m = this.getModel(collection);
    return m.length;
  }

  async avg<T>(
    collection: CollectionName,
    normQuery: INormQuery,
    field: keyof T & string
  ): Promise<number | null> {
    const m = this.getModel(collection);

    let sum = 0;
    let count = 0;

    for (const item of m) {
      const value = (item as any)[field];
      if (typeof value === "number") {
        sum += value;
        count++;
      }
      return count === 0 ? null : sum / count;
    }
  }

  async createDB(identifier: string) {
    // done via cli
  }

  async migrate() {
    //
  }

  private getModel(collection: CollectionName) {
    return this.dbClient[collection];
  }
}
