import {
  utils,
  AppQuery,
  AppError,
  PaginationSummaryDto,
  CreateProductDto,
  ProductDto,
  UpdateProductDto,
} from "@/common/container";
import type { EntityId } from "@/common/types";
import { ProductRepository } from "./repository";
import { ReviewRepository } from "@reviews/repository";

export class ProductService {
  constructor(
    private readonly repository: ProductRepository,
    private readonly reviewRepository: ReviewRepository
  ) {}

  async getItems(appQuery: AppQuery) {
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

    return [
      ProductDto.fromMany(items),
      PaginationSummaryDto.from(appQuery, total),
    ];
  }

  async getItem(id: EntityId, appQuery: AppQuery) {
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

    return ProductDto.from(item);
  }

  async createItem(createItemDto: CreateProductDto) {
    const newItem = await this.repository.create(createItemDto);
    return ProductDto.from(newItem);
  }

  async updateItem(id: EntityId, updateItemDto: UpdateProductDto) {
    const updatedItem = await this.repository.update(+id, updateItemDto);
    if (!updatedItem) throw AppError.notFound();

    return ProductDto.from(updatedItem);
  }

  async deleteItem(id: EntityId) {
    const deleted = await this.repository.delete(+id);
    if (!deleted) throw AppError.notFound();

    return deleted;
  }
}
