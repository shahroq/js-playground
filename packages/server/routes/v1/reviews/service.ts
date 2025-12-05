import { MetaData } from "@/common/container";
import type { EntityId } from "@/common/types";
import { ReviewRepository } from "./repository";
import type { IReviewResult, Review } from "./types";
import { ProductRepository } from "@products/repository";
import type { IRawQuery } from "@/common/query-object/types";

export class ReviewService {
  constructor(
    private readonly repository: ReviewRepository,
    private readonly productRepository: ProductRepository
  ) {}

  async findAll(rawQuery: IRawQuery): Promise<IReviewResult> {
    let [items, total] = await Promise.all([
      this.repository.findAll(rawQuery),
      this.repository.count(rawQuery),
    ]);

    const normQuery = this.repository.normalizeQuery(rawQuery);
    const meta = MetaData.build(normQuery, total);

    // get expansions: products
    if (normQuery.expansion?.include?.includes("products")) {
      items = await Promise.all(
        items.map(async (i) => {
          const product = await this.productRepository.findById(i.product_id);
          return { ...i, product: product ?? undefined };
        })
      );
    }

    return { items, meta };
  }

  async findOne(id: EntityId, rawQuery: IRawQuery): Promise<IReviewResult> {
    const item = await this.repository.findById(id);

    const normQuery = this.repository.normalizeQuery(rawQuery);
    // get expansions: products
    if (normQuery.expansion?.include?.includes("products")) {
      const product = await this.productRepository.findById(
        item?.id as EntityId
      );
      if (item && product) item.product = product;
    }
    return item ? { item } : {};
  }

  async create(data: Review): Promise<IReviewResult> {
    const newItem = await this.repository.create(data);
    return { item: newItem };
  }

  async update(id: EntityId, data: Partial<Review>): Promise<IReviewResult> {
    const updatedItem = await this.repository.update(id, data);
    return updatedItem ? { item: updatedItem } : {};
  }

  async delete(id: EntityId): Promise<boolean> {
    const deleted = await this.repository.delete(id);
    return deleted;
  }
}
