import type { EntityId, IRawQuery } from "@/common/type/type";
import { ProductRepository } from "./repository";
import type { IProductQuery, Product } from "./type";
import { QueryHelper } from "@/common/utils/query-helper";

// get repository
const repository = new ProductRepository();

export const productService = {
  async getItems(rawQuery: IRawQuery): Promise<Product[]> {
    const normalizedQuery: IProductQuery = QueryHelper.normalize(rawQuery);

    const allItems = await repository.find(normalizedQuery);
    return allItems;
  },
  async getItem(id: EntityId): Promise<Product | null> {
    const item = await repository.findById(id);
    return item;
  },

  async createItem(data: Product): Promise<Product> {
    const newItem = await repository.create(data);
    return newItem;
  },

  async updateItem(
    id: EntityId,
    data: Partial<Product>
  ): Promise<Product | null> {
    const updatedItem = await repository.update(id, data);
    return updatedItem;
  },

  async deleteItem(id: EntityId): Promise<boolean> {
    const deleted = await repository.delete(id);
    return deleted;
  },
};
