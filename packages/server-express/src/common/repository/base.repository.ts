import type { EntityId, CollectionName } from "@/common/types";
import type { QueryPolicy } from "@/common/query/types";
import type { IDbClient } from "@/common/db-client/db-client.interface";
import { AppQuery } from "@/common/container";

export abstract class BaseRepository<T> {
  constructor(
    protected readonly collection: CollectionName,
    protected readonly queryPolicy: QueryPolicy,
    protected readonly dbAdapter: IDbClient
  ) {}

  async findAll(appQuery: AppQuery): Promise<T[]> {
    return this.dbAdapter.findAll<T>(this.collection, appQuery);
  }

  async findOne(appQuery: AppQuery): Promise<T | null> {
    // TODO: how to remove per_page? If set the it on default.option.ts, it will override the config.
    appQuery.append({ per_page: 1 });
    return this.dbAdapter.findOne<T>(this.collection, appQuery);
  }

  async findById(id: EntityId): Promise<T | null> {
    return this.findOne(new AppQuery({ id }));
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

  async deleteMany(appQuery: AppQuery): Promise<number> {
    return await this.dbAdapter.deleteMany(this.collection, appQuery);
  }

  async count(appQuery: AppQuery): Promise<number> {
    return this.dbAdapter.count<T>(this.collection, appQuery);
  }
}
