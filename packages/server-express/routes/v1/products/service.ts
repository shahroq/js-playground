import {
  utils,
  AppQuery,
  AppError,
  PaginationSummaryDto,
} from "@/common/container";
import type { EntityId } from "@/common/types";
import { ProductRepository } from "./repository";
import { ReviewRepository } from "@reviews/repository";
import type { IProductResult, IProduct } from "./types";

export class ProductService {
  constructor(
    private readonly repository: ProductRepository,
    private readonly reviewRepository: ReviewRepository
  ) {}

  async getItems(appQuery: AppQuery): Promise<IProductResult> {
    let [items, total] = await Promise.all([
      this.repository.findAll(appQuery),
      this.repository.count(appQuery),
    ]);

    // get pagination summary
    const meta = PaginationSummaryDto.from(appQuery, total);

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

    return { items, meta };
  }

  async getItem(id: EntityId, appQuery: AppQuery): Promise<IProduct> {
    appQuery.append({ id });

    let item = await this.repository.findOne(appQuery);
    if (!item) throw AppError.notFound();

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

    return item;
  }

  async createItem(data: IProduct): Promise<IProduct> {
    const newItem = await this.repository.create(data);
    return newItem;
  }

  async updateItem(id: EntityId, data: Partial<IProduct>): Promise<IProduct> {
    const updatedItem = await this.repository.update(+id, data);
    if (!updatedItem) throw AppError.notFound();

    return updatedItem;
  }

  async deleteItem(id: EntityId): Promise<boolean> {
    const deleted = await this.repository.delete(+id);
    if (!deleted) throw AppError.notFound();

    return deleted;
  }
}
