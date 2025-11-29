import type { EntityId, CollectionName } from "@/common/types";
import { Query } from "@/common/query-object/query";
import type { OrderBy, IRawQuery } from "@/common/query-object/types";
import type { IDBAdapter } from "../db-adapter/db-adapter.interface";

export interface RepoOptions {
  defaultPerPage?: number;
  selectableFields: string[]; // whitelist
  defaultOrder?: OrderBy;
  allowedSortFields?: string[]; // whitelist for sort validation
  searchableFields?: string[]; // for q/search handling
  filterableFields?: string[]; // whitelist
  expandableCollections?: CollectionName[]; // whitelist
}

export abstract class BaseRepository<T> {
  constructor(
    protected collection: CollectionName,
    protected repoOptions: RepoOptions,
    protected dbAdapter: IDBAdapter
  ) {}

  async find(rawQuery: IRawQuery): Promise<T[]> {
    const normQuery = Query.normalize(rawQuery, this.repoOptions);
    return this.dbAdapter.find<T>(this.collection, normQuery);
  }

  async findOne(rawQuery: IRawQuery): Promise<T | null> {
    const normQuery = Query.normalize(rawQuery, this.repoOptions);
    return this.dbAdapter.findOne<T>(this.collection, normQuery);
  }

  async findById(id: EntityId): Promise<T | null> {
    return this.findOne({ id, per_page: 1 });
    // return this.dbAdapter.findById<T>(this.collection, id);
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
    const normQuery = Query.normalize(rawQuery, this.repoOptions);
    return this.dbAdapter.deleteMany(this.collection, normQuery);
  }

  async count(rawQuery: IRawQuery): Promise<number> {
    const normQuery = Query.normalize(rawQuery, this.repoOptions);
    return this.dbAdapter.count<T>(this.collection, normQuery);
  }

  normalizeQuery(rawQuery: IRawQuery) {
    return Query.normalize(rawQuery, this.repoOptions);
  }
}
