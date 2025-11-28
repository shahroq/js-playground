import type { CollectionName, EntityId, INormQuery } from "@/common/type";

// export type DatabaseStrategy = "file-json" | "lowdb-json" | "prisma-sqlite";
export type DBAdapterStrategy = "file" | "lowdb" | "prisma";

export interface IDBAdapter {
  connect(): Promise<void>;

  disconnect(): Promise<void>;

  find<T>(collection: CollectionName, normQuery: INormQuery): Promise<T[]>;

  findOne<T>(
    collection: CollectionName,
    normQuery: INormQuery
  ): Promise<T | null>;

  findById<T>(collection: CollectionName, id: EntityId): Promise<T | null>;

  create<T>(collection: CollectionName, data: T): Promise<T>;

  update<T>(
    collection: CollectionName,
    id: EntityId,
    data: Partial<T>
  ): Promise<T | null>;

  delete<T>(collection: CollectionName, id: EntityId): Promise<boolean>;

  deleteMany<T>(
    collection: CollectionName,
    normQuery: INormQuery
  ): Promise<number>;

  count<T>(collection: CollectionName, normQuery: INormQuery): Promise<number>;

  avg<T>(
    collection: CollectionName,
    normQuery: INormQuery,
    field: keyof T & string
  ): Promise<number | null>;

  /** identifier is:
   * filePath for filebase dbs (json, sqlite)
   * database name for db  engines (postgres, mysql)
   */
  createDB(identifier: string): Promise<void>;

  /**
   * Migration
   * check if db exists
   * if no: create it, and create the structure
   */
  migrate(): Promise<void>;
}
