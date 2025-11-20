import type { IDBAdapter } from "../db-adapter/db-adapter.interface";
import { getDBAdapter } from "../db-adapter/factory";

export abstract class BaseRepository<T> {
  protected db: IDBAdapter;

  constructor(protected collection: string) {
    this.db = getDBAdapter();
  }

  async findAll(): Promise<T[]> {
    return this.db.findAll<T>(this.collection);
  }

  async findById(id: string | number): Promise<T | null> {
    return this.db.findById<T>(this.collection, id);
  }

  async create(data: T): Promise<T> {
    return await this.db.create<T>(this.collection, data);
  }

  async update(id: string | number, data: Partial<T>): Promise<T | null> {
    return await this.db.update<T>(this.collection, id, data);
  }

  async delete(id: string | number): Promise<boolean> {
    return this.db.delete(this.collection, id);
  }

  async deleteMany(filter: any = {}): Promise<boolean> {
    return this.db.deleteMany(this.collection, filter);
  }

  async find(filter: any): Promise<T[]> {
    return this.db.find<T>(this.collection, filter);
  }

  async findOne(filter: any): Promise<T | null> {
    return this.db.findOne<T>(this.collection, filter);
  }

  async count(filter?: any): Promise<number> {
    return this.db.count<T>(this.collection, filter);
  }
}
