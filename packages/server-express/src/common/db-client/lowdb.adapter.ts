import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import fs from "fs-extra";
import { config, utils } from "@/common/container";
import { defaultData, type DatabaseSchema } from "@root/data/lowdb-json/schema";
import { buildAuditFields, type IDbClient } from "./db-client.interface";
import type { CollectionName, EntityId } from "../types";
import type { QueryObject } from "../query-object/types";

export class LowDbAdapter implements IDbClient {
  private dbClient: Low<DatabaseSchema>;
  private filePath = config.database.path ?? "";
  private defaultData: DatabaseSchema = defaultData;
  private userId: number;

  constructor() {
    const adapter = new JSONFile<DatabaseSchema>(this.filePath);
    this.dbClient = new Low(adapter, this.defaultData);
    this.userId = config.default.user_id;
  }

  async connect() {
    // Ensure file exists before LowDB tries to read it
    await fs.ensureFile(this.filePath);
    const adapter = new JSONFile<DatabaseSchema>(this.filePath);
    this.dbClient = new Low(adapter, this.defaultData);
    console.log(
      `🌕 Connected to LowDB: ${utils.truncateString(this.filePath, {
        position: "start",
      })}`
    );
  }

  async disconnect() {
    await this.dbClient.write();
    console.log("🌒 LowDB disconnected");
  }

  private async getModel(collection: CollectionName) {
    await this.dbClient.read();
    // const m = (this.dbClient.data[collection] || []) as T[];
    const m = this.dbClient.data[collection] || [];

    return m;
  }

  async findAll<T>(collection: CollectionName, queryObject: QueryObject) {
    const m = await this.getModel(collection);

    const items = m;

    return items;
  }

  async findOne<T>(collection: CollectionName, queryObject: QueryObject) {
    const m = await this.getModel(collection);
    const id = queryObject.filter?.id;

    const item = m.find((i) => i.id == id);

    return item || null;
  }

  async findById<T>(collection: CollectionName, id: EntityId) {
    return this.findOne<T>(collection, { filter: { id } });
  }

  async create<T extends { id?: any }>(collection: CollectionName, data: T) {
    const m = await this.getModel(collection);

    const newItem = {
      ...data,
      id: m.length + 1,
      ...buildAuditFields(
        ["created_at", "created_by", "updated_at", "updated_by"],
        {
          userId: this.userId,
        }
      ),
    };

    m.push(newItem);
    await this.dbClient.write();

    return { ...newItem } as T;
  }

  async update<T>(collection: CollectionName, id: EntityId, data: Partial<T>) {
    const m = await this.getModel(collection);

    const itemIndex = m.findIndex((item: any) => item.id === id);
    if (itemIndex < 0) return null;

    const updatedItem = {
      ...m[itemIndex],
      ...data,
      ...buildAuditFields(["updated_at", "updated_by"], {
        userId: this.userId,
      }),
    };

    m[itemIndex] = updatedItem;
    await this.dbClient.write();

    return updatedItem;
  }

  async delete(collection: CollectionName, id: EntityId) {
    const m = await this.getModel(collection);

    const itemIndex = m.findIndex((item: any) => item.id === id);
    if (itemIndex < 0) return null;

    m.splice(itemIndex, 1);

    await this.dbClient.write();

    return true;
  }

  async deleteMany<T>(collection: CollectionName, queryObject: QueryObject) {
    //
  }

  async count<T>(collection: CollectionName, queryObject: QueryObject) {
    const m = await this.getModel(collection);
    return m.length;
  }

  async avg<T>(
    collection: CollectionName,
    queryObject: QueryObject,
    field: keyof T & string
  ) {
    const m = await this.getModel(collection);

    let sum = 0;
    let count = 0;

    for (const item of m) {
      const value = (item as any)[field];
      if (typeof value === "number") {
        sum += value;
        count++;
      }
    }
    return count === 0 ? null : sum / count;
  }

  async createDB(identifier: string) {
    // Creates an empty file if not exist:
    await fs.ensureFile(identifier);

    // main file
    try {
      // file exists
      await this.dbClient.read(); // even if file
    } catch (err) {
      // file not exist, create it with defaultData
      console.warn(
        `⚠️ Lowdb read failed, initializing DB file (${identifier}) with default data...`
      );
      this.dbClient.data = this.defaultData;
      await this.dbClient.write();
      await this.dbClient.read();
    }

    // copy main file, for test
    // TODO: do something about it
    const dest = this.filePath.replace(/(\.[^/.]+)$/, "-test$1");
    if (!fs.pathExistsSync(dest)) {
      await fs.copy(identifier, dest);
      console.log("Test file created successfully!");
    }
  }

  override async migrate() {
    await super.migrate();
    // TODO: do something about creating test db/ maybe duplicate?
    await this.createDB(this.filePath);
  }
}
