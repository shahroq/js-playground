import type { Awaitable, CollectionName, EntityId } from "@/common/types";
import type { INormQuery } from "@/common/query-object/types";

// export type DatabaseStrategy = "file-json" | "lowdb-json" | "prisma-sqlite";
export type DBAdapterStrategy = "memory" | "file" | "lowdb" | "prisma";

export interface IDBAdapter {
  connect(): Awaitable<void>;

  disconnect(): Awaitable<void>;

  find<T>(collection: CollectionName, normQuery: INormQuery): Awaitable<T[]>;

  findOne<T>(
    collection: CollectionName,
    normQuery: INormQuery
  ): Awaitable<T | null>;

  findById<T>(collection: CollectionName, id: EntityId): Awaitable<T | null>;

  create<T>(collection: CollectionName, data: T): Awaitable<T>;

  update<T>(
    collection: CollectionName,
    id: EntityId,
    data: Partial<T>
  ): Awaitable<T | null>;

  delete<T>(collection: CollectionName, id: EntityId): Awaitable<boolean>;

  deleteMany<T>(
    collection: CollectionName,
    normQuery: INormQuery
  ): Awaitable<number>;

  count<T>(
    collection: CollectionName,
    normQuery: INormQuery
  ): Awaitable<number>;

  avg<T>(
    collection: CollectionName,
    normQuery: INormQuery,
    field: keyof T & string
  ): Awaitable<number | null>;

  /** identifier is:
   * filePath for filebase dbs (json, sqlite)
   * database name for db  engines (postgres, mysql)
   */
  createDB(identifier: string): Awaitable<void>;

  /**
   * Migration
   * check if db exists
   * if no: create it, and create the structure
   */
  migrate(): Awaitable<void>;
}
