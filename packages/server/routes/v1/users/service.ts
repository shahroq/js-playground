import type { EntityId } from "@/common/type";
import { UserRepository } from "./repository";
import type { User } from "./type";

// get repository
const repository = new UserRepository();

export const userService = {
  async getItems(): Promise<User[]> {
    const allItems = await repository.find();
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
