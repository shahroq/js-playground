export type DatabaseStrategy = "file-json" | "lowdb-json" | "prisma-sqlite";

export interface QueryFilter<T> {
  where?: Partial<T> | ((item: T) => boolean);
  limit?: number;
  offset?: number;
  orderBy?: {
    field: keyof T;
    direction: "asc" | "desc";
  };
}

export abstract class BaseAdapter {
  // constructor() {}

  abstract connect(): Promise<void>;

  abstract disconnect(): Promise<void>;

  abstract findAll<T>(collection: string): Promise<T[]>;

  abstract findById<T>(
    collection: string,
    id: string | number
  ): Promise<T | null>;

  abstract create<T>(collection: string, data: T): Promise<T>;

  abstract update<T>(
    collection: string,
    id: string | number,
    data: Partial<T>
  ): Promise<T | null>;

  abstract delete(collection: string, id: string | number): Promise<boolean>;

  abstract deleteMany(
    collection: string,
    filter: QueryFilter<T>
  ): Promise<boolean>;

  abstract find<T>(collection: string, filter: QueryFilter<T>): Promise<T[]>;

  abstract findOne<T>(
    collection: string,
    filter: QueryFilter<T>
  ): Promise<T | null>;

  abstract count<T>(
    collection: string,
    filter?: QueryFilter<T>
  ): Promise<number>;

  /** identifier is
   * filePath for filebase dbs
   * database name for db  engines
   */
  abstract createDB(identifier: string): Promise<void>;

  /**
   * Migration
   * check if db exists
   * if no: create it, and create the structure
   */
  async migrate(): Promise<void> {
    console.log(`Migrating starts...`);
    // for both prod/test daba
  }
}
