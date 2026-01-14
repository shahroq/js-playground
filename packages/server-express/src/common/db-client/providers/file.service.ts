import fs from "fs-extra";
import { config, utils } from "@/common/container";
import type { QueryObject } from "@/common/query-object/types";
import type { CollectionName, EntityId, hasId } from "@/common/types";
import { defaultData, type DatabaseSchema } from "@root/data/file-json/schema";
import {
  buildAuditFields,
  type IDbClientService,
} from "../db-client-service.interface";

export class FileService implements IDbClientService {
  private db: DatabaseSchema = {};
  private filePath = config.database.path ?? "";
  private defaultData: DatabaseSchema = defaultData;
  private userId: number;

  constructor() {
    this.userId = config.default.user_id;
  }

  async connect() {
    await fs.ensureFile(this.filePath);
    await this.readFile();
    console.log(
      `🌕 Connected to FS JSON: ${utils.truncateString(this.filePath, {
        position: "start",
      })}`
    );
  }

  async disconnect() {
    await this.writeFile();
    console.log("🌒 FS JSON disconnected");
  }

  private async getModel(collection: CollectionName): ModelDelegate {
    await this.readFile();
    const m = (this.data[collection] || []) as T[];
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

  async create<T extends hasId>(collection: CollectionName, data: T) {
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
    await this.writeFile();

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
    await this.writeFile();

    return updatedItem;
  }

  async delete(collection: CollectionName, id: EntityId) {
    const m = await this.getModel(collection);

    const itemIndex = m.findIndex((item: any) => item.id === id);
    if (itemIndex < 0) return null;

    m.splice(itemIndex, 1);

    await this.writeFile();

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
  ): Promise<number | null> {
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

  private async readFile(): Promise<void> {
    try {
      this.data = await fs.readJson(this.filePath);
    } catch {
      this.data = { ...this.defaultData };
      await this.writeFile();
    }
  }

  private async writeFile(): Promise<void> {
    this.touchMeta();
    await fs.writeJson(this.filePath, this.data, { spaces: 2 });
  }

  private touchMeta(): void {
    this.data = {
      ...this.data,
      meta: {
        ...this.data.meta,
        updated_at: utils.formatISO(),
      },
    };
  }
}
