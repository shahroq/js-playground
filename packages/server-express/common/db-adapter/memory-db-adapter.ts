import data from "@/data/memory-json/data.json";
import { AppQuery, config, utils } from "@/common/container";
import { buildAuditFields, type IDBAdapter } from "./db-adapter.interface";
import type { EntityId, CollectionName } from "@/common/types";

export class MemoryDBAdapter implements IDBAdapter {
  private dbClient;
  private userId: number;

  constructor() {
    this.dbClient = data;
    this.userId = +config.user_id;
  }

  connect() {
    console.log(`🌕 Fetching initial data from json file`);
  }

  disconnect() {
    //
  }

  private getModel(collection: CollectionName) {
    return this.dbClient[collection];
  }

  findAll<T>(collection: CollectionName, appQuery: AppQuery) {
    const m = this.getModel(collection);

    const items = m;

    return items;
  }

  findOne<T>(collection: CollectionName, appQuery: AppQuery) {
    const m = this.getModel(collection);
    const id = appQuery.normQuery.filter?.id;

    const item = m.find((item) => item.id == id);

    return item || null;
  }

  findById<T>(collection: CollectionName, id: EntityId) {
    return this.findOne<T>(collection, new AppQuery({ id }));
  }

  create<T>(collection: CollectionName, data: T) {
    const m = this.getModel(collection);

    const newItem = {
      ...data,
      id: m.length + 1,
      ...buildAuditFields(
        ["created_at", "created_by", "updated_at", "updated_by"],
        {
          userId: this.userId,
        }
      ),
    };

    m.push(newItem);

    return newItem;
  }

  update<T>(collection: CollectionName, id: EntityId, data: Partial<T>) {
    const m = this.getModel(collection);

    const itemIndex = m.findIndex((item) => item.id === id);
    if (itemIndex < 0) return null;

    const updatedItem = {
      ...m[itemIndex],
      ...data,
      ...buildAuditFields(["updated_at", "updated_by"], {
        userId: this.userId,
      }),
    };

    m[itemIndex] = updatedItem;

    return updatedItem;
  }

  delete<T>(collection: CollectionName, id: EntityId) {
    const m = this.getModel(collection);

    const itemIndex = m.findIndex((item) => item.id === id);
    if (itemIndex < 0) return null;

    m.splice(itemIndex, 1);

    return true;
  }

  deleteMany<T>(collection: CollectionName, appQuery: AppQuery) {
    const m = this.getModel(collection);

    const deletedCount = m.length;

    return deletedCount;
  }

  count<T>(collection: CollectionName, appQuery: AppQuery) {
    const m = this.getModel(collection);
    return m.length;
  }

  avg<T>(
    collection: CollectionName,
    appQuery: AppQuery,
    field: keyof T & string
  ) {
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
}
