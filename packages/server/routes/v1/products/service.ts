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
    let items = await repository.find(rawQuery);
    const total = await repository.count(rawQuery);

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

  async getItemWithReviews(id: EntityId): Promise<IProductResultWithReviews> {
    const item = await repository.findById(id);
    const reviews = await reviewRepository.findByProductId(id);
    const review_count = await reviewRepository.count({ product_id: id });
    const average_rating = await reviewRepository.average({ product_id: id });
    return item ? { item, reviews, review_count, average_rating } : {};
  },
};
