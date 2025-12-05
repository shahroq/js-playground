import { MetaData } from "@/common/container";
import type { EntityId } from "@/common/types";
import { ProductRepository } from "./repository";
import { ReviewRepository } from "@reviews/repository";
import type { Product, IProductResult } from "./types";
import type { IRawQuery } from "@/common/query-object/types";

export class ProductService {
  constructor(
    private readonly repository: ProductRepository,
    private readonly reviewRepository: ReviewRepository
  ) {}

  async findAll(rawQuery: IRawQuery): Promise<IProductResult> {
    let [items, total] = await Promise.all([
      this.repository.findAll(rawQuery),
      this.repository.count(rawQuery),
    ]);

    // TODO: remove this dependency, build meta somewhere else maybe?
    const normQuery = this.repository.normalizeQuery(rawQuery);
    const meta = MetaData.build(normQuery, total);

    // get expansions: reviews
    if (normQuery.expansion?.include?.includes("reviews")) {
      items = await Promise.all(
        items.map(async (i) => {
          const reviews = await this.reviewRepository.findByProductId(
            i.id as EntityId
          );
          return { ...i, reviews };
        })
      );
    }

    return { items, meta };
  }

  async findOne(id: EntityId, rawQuery: IRawQuery): Promise<IProductResult> {
    const item = await this.repository.findById(id);

    const normQuery = this.repository.normalizeQuery(rawQuery);
    if (normQuery.expansion?.include?.includes("reviews")) {
      const reviews = await this.reviewRepository.findByProductId(
        item?.id as EntityId
      );
      if (item && reviews) item.reviews = reviews;
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
