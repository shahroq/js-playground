import type { EntityId, Product } from "@/core/types";
import { ProductRepository } from "./repository";

// get repository
const repository = new ProductRepository();

export const productService = {
  async getItems(): Promise<Product[]> {
    const allItems = await repository.findAll();
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
