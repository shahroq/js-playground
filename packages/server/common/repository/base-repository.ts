import type { IDBAdapter } from "@/common/db-adapter/db-adapter.interface";
import { getDBAdapter } from "@/common/db-adapter/factory";
import type {
  OrderBy,
  IRawQuery,
  EntityId,
  CollectionName,
} from "@/common/type/type";
import { Query } from "@/common/utils/query";

export interface RepoOptions {
  defaultPerPage?: number;
  defaultOrder?: OrderBy;
  allowedSortFields?: string[]; // whitelist for sort validation
  searchableFields?: string[]; // for q/search handling
  filterableFields?: string[]; // whitelist
}

export abstract class BaseRepository<T> {
  protected dbAdapter: IDBAdapter;

  constructor(
    protected collection: CollectionName,
    protected repoOptions: RepoOptions = {}
  ) {
    this.dbAdapter = getDBAdapter();
  }

  async find(rawQuery: IRawQuery): Promise<T[]> {
    const normQuery = new Query(rawQuery, this.repoOptions).getNormalized();
    return this.dbAdapter.find<T>(this.collection, normQuery);
  }

  async findOne(rawQuery: IRawQuery): Promise<T | null> {
    const normQuery = new Query(rawQuery, this.repoOptions).getNormalized();
    return this.dbAdapter.findOne<T>(this.collection, normQuery);
  }

  async findById(id: EntityId): Promise<T | null> {
    return this.dbAdapter.findById<T>(this.collection, id);
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

  async deleteMany(rawQuery: IRawQuery): Promise<number> {
    const normQuery = new Query(rawQuery, this.repoOptions).getNormalized();
    return this.dbAdapter.deleteMany(this.collection, normQuery);
  }

  async count(rawQuery: IRawQuery): Promise<number> {
    const normQuery = new Query(rawQuery, this.repoOptions).getNormalized();
    return this.dbAdapter.count<T>(this.collection, normQuery);
  }
}
