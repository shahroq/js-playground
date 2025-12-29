import {
  AppQuery,
  ApiError,
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

    // get expansions
    const expansionList = appQuery.normQuery?.expansion?.include ?? [];
    if (expansionList.includes("reviews")) {
      for (const item of items)
        Object.assign(item, await this.getProductReviews(item.id));
    }

    return [
      ProductDto.fromMany(items),
      PaginationSummaryDto.from(appQuery, total),
    ];
  }

  async getItem(id: EntityId, appQuery: AppQuery) {
    appQuery.append({ id });

    const item = await this.repository.findOne(appQuery);
    if (!item) throw ApiError.notFound();

    // get expansions
    const expansionList = appQuery.normQuery?.expansion?.include ?? [];
    if (expansionList.includes("reviews")) {
      Object.assign(item, await this.getProductReviews(item.id));
    }

    return ProductDto.from(item);
  }

  async createItem(createItemDto: CreateProductDto) {
    const newItem = await this.repository.create(createItemDto);
    return ProductDto.from(newItem);
  }

  async updateItem(id: EntityId, updateItemDto: UpdateProductDto) {
    const updatedItem = await this.repository.update(+id, updateItemDto);
    if (!updatedItem) throw ApiError.notFound();

    return ProductDto.from(updatedItem);
  }

  async deleteItem(id: EntityId) {
    const deleted = await this.repository.delete(+id);
    if (!deleted) throw ApiError.notFound();

    return deleted;
  }

  private async getProductReviews(id: EntityId) {
    const reviews = await this.reviewRepository.findAllByProductId(id);
    return reviews ?? {};
  }
}
