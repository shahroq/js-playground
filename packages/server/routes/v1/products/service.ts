import type { EntityId, IRawQuery } from "@/common/type/type";
import { ProductRepository } from "./repository";
import type { IProductResult, Product } from "./type";
import { MetaData } from "@/common/utils/meta-data";

// get repository
const repository = new ProductRepository();

export const productService = {
  async getItems(rawQuery: IRawQuery): Promise<IProductResult> {
    const items = await repository.find(rawQuery);
    const total = await repository.count(rawQuery);

    const normQuery = repository.normalizeQuery(rawQuery);
    const meta = new MetaData(normQuery, total).build();

    return { items, meta };
  },

  async getItem(id: EntityId): Promise<IProductResult> {
    const item = await repository.findById(id);
    return item ? { item } : {};
  },

  async createItem(data: Product): Promise<IProductResult> {
    const newItem = await repository.create(data);
    return { item: newItem };
  },

  async updateItem(
    id: EntityId,
    data: Partial<Product>
  ): Promise<IProductResult> {
    const updatedItem = await repository.update(id, data);
    return updatedItem ? { item: updatedItem } : {};
  },

  async deleteItem(id: EntityId): Promise<boolean> {
    const deleted = await repository.delete(id);
    return deleted;
  },
};
