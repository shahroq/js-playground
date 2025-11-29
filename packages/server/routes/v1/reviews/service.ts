import type { EntityId } from "@/common/types";
import { ReviewRepository } from "./repository";
import type { IReviewResult, Review } from "./types";
import { MetaData } from "@/common/utils/meta-data";
import { ProductRepository } from "@products/repository";
import type { IRawQuery } from "@/common/query-object/types";

// get repository
const repository = new ReviewRepository();
const productRepository = new ProductRepository();

export const reviewService = {
  async getItems(rawQuery: IRawQuery): Promise<IReviewResult> {
    let [items, total] = await Promise.all([
      repository.find(rawQuery),
      repository.count(rawQuery),
    ]);

    const normQuery = repository.normalizeQuery(rawQuery);
    const meta = MetaData.build(normQuery, total);

    // get expansions: products
    if (normQuery.expansion?.include?.includes("products")) {
      items = await Promise.all(
        items.map(async (i) => {
          const product = await productRepository.findById(i.product_id);
          return { ...i, product: product ?? undefined };
        })
      );
    }

    return { items, meta };
  },

  async getItem(id: EntityId, rawQuery: IRawQuery): Promise<IReviewResult> {
    const item = await repository.findById(id);

    const normQuery = repository.normalizeQuery(rawQuery);
    // get expansions: products
    if (normQuery.expansion?.include?.includes("products")) {
      const product = await productRepository.findById(item?.id as EntityId);
      if (item && product) item.product = product;
    }
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
