import type { INormQuery } from "@/common/type/type";

// export type DatabaseStrategy = "file-json" | "lowdb-json" | "prisma-sqlite";
export type DBAdapterStrategy = "file" | "lowdb" | "prisma";

export interface IDBAdapter {
  connect(): Promise<void>;

  disconnect(): Promise<void>;

  find<T>(collection: string, args: INormQuery): Promise<T[]>;

  findOne<T>(collection: string, args: INormQuery): Promise<T | null>;

  findById<T>(collection: string, id: string | number): Promise<T | null>;

  create<T>(collection: string, data: T): Promise<T>;

  update<T>(
    collection: string,
    id: string | number,
    data: Partial<T>
  ): Promise<T | null>;

  delete(collection: string, id: string | number): Promise<boolean>;

  deleteMany(collection: string, query: IQuery): Promise<boolean>;

  count<T>(collection: string, query: IQuery): Promise<number>;

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
