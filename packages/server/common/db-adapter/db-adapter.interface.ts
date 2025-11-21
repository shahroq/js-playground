// export type DatabaseStrategy = "file-json" | "lowdb-json" | "prisma-sqlite";
export type DBAdapterStrategy = "file" | "lowdb" | "prisma";

export interface QueryFilter<T> {
  where?: Partial<T> | ((item: T) => boolean);
  limit?: number;
  offset?: number;
  orderBy?: {
    field: keyof T;
    direction: "asc" | "desc";
  };
}

export interface IDBAdapter {
  connect(): Promise<void>;

  disconnect(): Promise<void>;

  find<T>(collection: string, filter: QueryFilter<T>): Promise<T[]>;

  findOne<T>(collection: string, filter: QueryFilter<T>): Promise<T | null>;

  findById<T>(collection: string, id: string | number): Promise<T | null>;

  create<T>(collection: string, data: T): Promise<T>;

  update<T>(
    collection: string,
    id: string | number,
    data: Partial<T>
  ): Promise<T | null>;

  delete(collection: string, id: string | number): Promise<boolean>;

  deleteMany(collection: string, filter: QueryFilter<T>): Promise<boolean>;

  count<T>(collection: string, filter?: QueryFilter<T>): Promise<number>;

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
