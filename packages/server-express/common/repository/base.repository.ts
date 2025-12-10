import type { EntityId, CollectionName } from "@/common/types";
import type { INormQuery, QueryOptions } from "@/common/query-object/types";
import type { IDBAdapter } from "@/common/db-adapter/db-adapter.interface";

export abstract class BaseRepository<T> {
  constructor(
    protected readonly collection: CollectionName,
    protected readonly queryOptions: QueryOptions,
    protected readonly dbAdapter: IDBAdapter
  ) {}

  async findAll(normQuery: INormQuery): Promise<T[]> {
    return this.dbAdapter.find<T>(this.collection, normQuery);
  }

  async findOne(normQuery: INormQuery): Promise<T | null> {
    return this.dbAdapter.findOne<T>(this.collection, normQuery);
  }

  async findById(id: EntityId): Promise<T | null> {
    return this.findOne({ filter: { id } });
  }

  async create(data: T): Promise<T> {
    return await this.dbAdapter.create<T>(this.collection, data);
  }

  async update(id: EntityId, data: Partial<T>): Promise<T | null> {
    return await this.dbAdapter.update<T>(this.collection, id, data);
  }

  async delete(id: EntityId): Promise<boolean> {
    return this.dbAdapter.delete(this.collection, id);
  }

  async deleteMany(normQuery: INormQuery): Promise<number> {
    return this.dbAdapter.deleteMany(this.collection, normQuery);
  }

  async count(normQuery: INormQuery): Promise<number> {
    return this.dbAdapter.count<T>(this.collection, normQuery);
  }
}
