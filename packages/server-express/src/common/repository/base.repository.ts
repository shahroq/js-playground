import type { EntityId, CollectionName } from "@/common/types";
import type { IDbClientService } from "@/common/db-client/db-client-service.interface";
import type { QueryObject } from "../query-object/types";

export abstract class BaseRepository<T> {
  constructor(
    protected readonly collection: CollectionName,
    protected readonly dbClientService: IDbClientService
  ) {}

  async findAll(queryObject: QueryObject): Promise<T[]> {
    return this.dbClientService.findAll<T>(this.collection, queryObject);
  }

  async findOne(queryObject: QueryObject): Promise<T | null> {
    return this.dbClientService.findOne<T>(this.collection, queryObject);
  }

  async findById(id: EntityId): Promise<T | null> {
    return this.dbClientService.findById<T>(this.collection, id);
  }

  async create(payload: T): Promise<T> {
    return await this.dbClientService.create<T>(this.collection, payload);
  }

  async update(id: EntityId, payload: Partial<T>): Promise<T | null> {
    return await this.dbClientService.update<T>(this.collection, id, payload);
  }

  async delete(id: EntityId): Promise<boolean> {
    return await this.dbClientService.delete(this.collection, id);
  }

  async deleteMany(queryObject: QueryObject): Promise<number> {
    return await this.dbClientService.deleteMany(this.collection, queryObject);
  }

  async count(queryObject: QueryObject): Promise<number> {
    return this.dbClientService.count<T>(this.collection, queryObject);
  }
}
