import type { EntityId, User } from "@/common/types";
import { UserRepository } from "./repository";

// get repository
const repository = new UserRepository();

export const userService = {
  async getItems(): Promise<User[]> {
    const allItems = await repository.findAll();
    return allItems;
  },

  async getItem(id: EntityId): Promise<User | null> {
    const item = await repository.findById(id);
    return item;
  },

  async createItem(data: User): Promise<User> {
    const newItem = await repository.create(data);
    return newItem;
  },

  async updateItem(id: EntityId, data: Partial<User>): Promise<User | null> {
    const updatedItem = await repository.update(id, data);
    return updatedItem;
  },

  async deleteItem(id: EntityId): Promise<boolean> {
    const deleted = await repository.delete(id);
    return deleted;
  },
};
