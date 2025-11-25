import type { EntityId, IRawQuery } from "@/common/type/type";
import { ReviewRepository } from "./repository";
import type { IReviewResult, Review } from "./type";
import { MetaData } from "@/common/utils/meta-data";

// get repository
const repository = new ReviewRepository();

export const reviewService = {
  async getItems(rawQuery: IRawQuery): Promise<IReviewResult> {
    const items = await repository.find(rawQuery);
    const total = await repository.count(rawQuery);

    const normQuery = repository.normalizeQuery(rawQuery);
    const meta = new MetaData(normQuery, total).build();

    return { items, meta };
  },

  async getItem(id: EntityId): Promise<IReviewResult> {
    const item = await repository.findById(id);
    return item ? { item } : {};
  },

  async createItem(data: Review): Promise<IReviewResult> {
    const newItem = await repository.create(data);
    return { item: newItem };
  },

  async updateItem(
    id: EntityId,
    data: Partial<Review>
  ): Promise<IReviewResult> {
    const updatedItem = await repository.update(id, data);
    return updatedItem ? { item: updatedItem } : {};
  },

  async deleteItem(id: EntityId): Promise<boolean> {
    const deleted = await repository.delete(id);
    return deleted;
  },
};
