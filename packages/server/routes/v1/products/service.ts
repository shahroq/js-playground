import { Review } from "./../../../__bak/express_app_structure-v10-2";
import type { EntityId, IRawQuery } from "@/common/type/type";
import { ProductRepository } from "./repository";
import type {
  Product,
  IProductResult,
  IProductResultWithReviews,
} from "./type";
import { MetaData } from "@/common/utils/meta-data";
import { ReviewRepository } from "../reviews/repository";

// get repository
const repository = new ProductRepository();
const reviewRepository = new ReviewRepository();

export const productService = {
  async getItems(rawQuery: IRawQuery): Promise<IProductResult> {
    let [items, total] = await Promise.all([
      repository.find(rawQuery),
      repository.count(rawQuery),
    ]);

    const normQuery = repository.normalizeQuery(rawQuery);
    const meta = new MetaData(normQuery, total).build();

    // get expansions: reviews
    if (normQuery.expansion?.include?.includes("reviews")) {
      items = await Promise.all(
        items.map(async (i) => {
          const reviews = await reviewRepository.findByProductId(
            i.id as EntityId
          );
          return { ...i, reviews };
        })
      );
    }

    return { items, meta };
  },

  async getItem(id: EntityId, rawQuery: IRawQuery): Promise<IProductResult> {
    const item = await repository.findById(id);

    const normQuery = repository.normalizeQuery(rawQuery);
    if (normQuery.expansion?.include?.includes("reviews")) {
      const reviews = await reviewRepository.findByProductId(
        item?.id as EntityId
      );
      if (item && reviews) item.reviews = reviews;
    }

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
