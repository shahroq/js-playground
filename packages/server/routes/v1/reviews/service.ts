import type { EntityId } from "@/common/type/type";
import { ReviewRepository } from "./repository";
import type { Review } from "./type";

// get repository
const repository = new ReviewRepository();

export const reviewService = {
  async getItems(): Promise<Review[]> {
    const allItems = await repository.findAll();
    return allItems;
  },

  async getItem(id: EntityId): Promise<Review | null> {
    const item = await repository.findById(id);
    return item;
  },

  async createItem(data: Review): Promise<Review> {
    const newItem = await repository.create(data);
    return newItem;
  },

  async updateItem(
    id: EntityId,
    data: Partial<Review>
  ): Promise<Review | null> {
    const updatedItem = await repository.update(id, data);
    return updatedItem;
  },

  async deleteItem(id: EntityId): Promise<boolean> {
    const deleted = await repository.delete(id);
    return deleted;
  },
};
