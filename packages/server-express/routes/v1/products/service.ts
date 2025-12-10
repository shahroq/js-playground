import { MetaData, utils } from "@/common/container";
import type { EntityId } from "@/common/types";
import { ProductRepository } from "./repository";
import { ReviewRepository } from "@reviews/repository";
import type { Product, IProductResult } from "./types";
import type { INormQuery } from "@/common/query-object/types";

export class ProductService {
  constructor(
    private readonly repository: ProductRepository,
    private readonly reviewRepository: ReviewRepository
  ) {}

  async findAll(normQuery: INormQuery): Promise<IProductResult> {
    let [items, total] = await Promise.all([
      this.repository.findAll(normQuery),
      this.repository.count(normQuery),
    ]);

    // TODO: remove this dependency, build meta somewhere else maybe?
    const meta = new MetaData(normQuery, total).build();

    // get expansions: reviews
    if (normQuery.expansion?.include?.includes("reviews")) {
      items = await Promise.all(
        items.map(async (i) => {
          const reviews = await this.reviewRepository.findByProductId(
            i.id as EntityId
          );

          const newReviews = utils.renameKey(reviews, "items", "reviews");
          return { ...i, ...newReviews };
        })
      );
    }

    return { items, meta };
  }

  async findOne(id: EntityId, normQuery: INormQuery): Promise<IProductResult> {
    let item = await this.repository.findById(id);

    if (normQuery.expansion?.include?.includes("reviews")) {
      const reviews = await this.reviewRepository.findByProductId(
        item?.id as EntityId
      );
      if (item && reviews) item = { ...item, ...reviews };
    }

    return item ? { item } : {};
  }

  async create(data: Product): Promise<IProductResult> {
    const newItem = await this.repository.create(data);
    return { item: newItem };
  }

  async updateItem(
    id: EntityId,
    data: Partial<Product>
  ): Promise<IProductResult> {
    const updatedItem = await this.repository.update(id, data);
    return updatedItem ? { item: updatedItem } : {};
  }

  async delete(id: EntityId): Promise<boolean> {
    const deleted = await this.repository.delete(id);
    return deleted;
  }
}
