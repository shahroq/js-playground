import { MetaData, utils, AppQuery } from "@/common/container";
import type { EntityId } from "@/common/types";
import { ProductRepository } from "./repository";
import { ReviewRepository } from "@reviews/repository";
import type { Product, IProductResult } from "./types";

export class ProductService {
  constructor(
    private readonly repository: ProductRepository,
    private readonly reviewRepository: ReviewRepository
  ) {}

  async findAll(appQuery: AppQuery): Promise<IProductResult> {
    let [items, total] = await Promise.all([
      this.repository.findAll(appQuery),
      this.repository.count(appQuery),
    ]);

    // TODO: abstract away
    // get expansions: reviews
    if (appQuery.normQuery.expansion?.include?.includes("reviews")) {
      items = await Promise.all(
        items.map(async (item) => {
          const reviews = await this.reviewRepository.findAllByProductId(
            item.id as EntityId
          );

          const newReviews = utils.renameKey(reviews, "items", "reviews");
          return { ...item, ...newReviews };
        })
      );
    }

    // TODO: remove this dependency, build meta somewhere else maybe?
    // get meta data
    const meta = new MetaData(appQuery, total).build();

    return { items, meta };
  }

  async findOne(id: EntityId, appQuery: AppQuery): Promise<IProductResult> {
    let item = await this.repository.findById(id);

    // get expansions: reviews
    if (appQuery.normQuery.expansion?.include?.includes("reviews")) {
      const reviews = await this.reviewRepository.findAllByProductId(
        item?.id as EntityId
      );
      if (item && reviews) {
        item = { ...item, ...reviews };
        // @ts-ignore
        item = utils.renameKey(item, "items", "reviews");
      }
    }

    return item ? { item } : {};
  }

  async create(data: Product): Promise<IProductResult> {
    const newItem = await this.repository.create(data);
    return { item: newItem };
  }

  async update(id: EntityId, data: Partial<Product>): Promise<IProductResult> {
    const updatedItem = await this.repository.update(id, data);
    return updatedItem ? { item: updatedItem } : {};
  }

  async delete(id: EntityId): Promise<boolean> {
    const deleted = await this.repository.delete(id);
    return deleted;
  }
}
