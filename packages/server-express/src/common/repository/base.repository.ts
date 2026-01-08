import type { EntityId, CollectionName } from "@/common/types";
import type { IDbClientService } from "@/common/db-client/db-client-service.interface";
import type { QueryObject } from "../query-object/types";

export abstract class BaseRepository<T> {
  constructor(
    protected readonly collection: CollectionName,
    protected readonly dbAdapter: IDbClientService
  ) {}

  async findAll(queryObject: QueryObject): Promise<T[]> {
    return this.dbAdapter.findAll<T>(this.collection, queryObject);
  }

  async findOne(queryObject: QueryObject): Promise<T | null> {
    return this.dbAdapter.findOne<T>(this.collection, queryObject);
  }

  async findById(id: EntityId): Promise<T | null> {
    return this.dbAdapter.findById<T>(this.collection, id);
  }

  async create(payload: T): Promise<T> {
    return await this.dbAdapter.create<T>(this.collection, payload);
  }

  async update(id: EntityId, payload: Partial<T>): Promise<T | null> {
    return await this.dbAdapter.update<T>(this.collection, id, payload);
  }

  async delete(id: EntityId): Promise<boolean> {
    return await this.dbAdapter.delete(this.collection, id);
  }

  async deleteMany(queryObject: QueryObject): Promise<number> {
    return await this.dbAdapter.deleteMany(this.collection, queryObject);
  }

  async count(queryObject: QueryObject): Promise<number> {
    return this.dbAdapter.count<T>(this.collection, queryObject);
  }
}
