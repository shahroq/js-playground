import type { Awaitable, CollectionName, EntityId } from "@/common/types";
import type { QueryObject } from "../query-object/types";

export type DBAdapterStrategy = "memory" | "file" | "lowdb" | "prisma";

export type AuditField =
  | "created_at"
  | "updated_at"
  | "created_by"
  | "updated_by"
  | "deleted_at"; // in case we need soft-delete

export interface CurrentContext {
  userId: number; // comes from auth middleware
  now?: () => Date; // optional for testability
}

export interface IDbClient {
  connect(): Awaitable<void>;

  disconnect(): Awaitable<void>;

  findAll<T>(
    collection: CollectionName,
    queryObject: QueryObject
  ): Awaitable<T[]>;

  findOne<T>(
    collection: CollectionName,
    queryObject: QueryObject
  ): Awaitable<T | null>;

  findById<T>(collection: CollectionName, id: EntityId): Awaitable<T | null>;

  create<T>(collection: CollectionName, data: T): Awaitable<T>;

  update<T>(
    collection: CollectionName,
    id: EntityId,
    data: Partial<T>
  ): Awaitable<T | null>;

  delete<T>(
    collection: CollectionName,
    id: EntityId
  ): Awaitable<boolean | null>;

  deleteMany<T>(
    collection: CollectionName,
    queryObject: QueryObject
  ): Awaitable<number>;

  count<T>(
    collection: CollectionName,
    queryObject: QueryObject
  ): Awaitable<number>;

  avg<T>(
    collection: CollectionName,
    queryObject: QueryObject,
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

/**
 * append audit fields (created_at, created_by, etc) to data
 * why here in db-adapter layer: some ORM support this out of the box (prisma: via middleware, of defaulr values).
 * so needds to be tweakable via adapter layer.
 * @param fields : array of fields to append eg: ["create_at", "created_by", ..]
 * @param context: for passing the userId
 */

export function buildAuditFields(
  fields: AuditField[],
  context: CurrentContext
): Record<string, any> {
  const result: Record<string, any> = {};

  const now = context.now?.() ?? new Date();

  const isDateField = (f: string) => f.endsWith("at");
  const isUserField = (f: string) => f.endsWith("by");

  for (const field of fields) {
    if (isDateField(field)) {
      result[field] = now;
    } else if (isUserField(field)) {
      result[field] = context.userId;
    }
  }

  return result;
}
