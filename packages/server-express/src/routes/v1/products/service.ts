import {
  AppError,
  ProductDto,
  CreateProductDto,
  UpdateProductDto,
  PaginationSummaryDto,
} from "@/common/container";
import type { EntityId } from "@/common/types";
import { ProductRepository } from "./repository";
import { ReviewRepository } from "@reviews/repository";
import type { QueryObject } from "@/common/query-object/types";

export class ProductService {
  constructor(
    private readonly repository: ProductRepository,
    private readonly reviewRepository: ReviewRepository
  ) {}

  async getItems(queryObject: QueryObject) {
    let [items, total] = await Promise.all([
      this.repository.findAll(queryObject),
      this.repository.count(queryObject),
    ]);

    // get expansions
    if (queryObject?.include?.includes("reviews")) {
      for (const item of items)
        Object.assign(item, await this.getProductReviews(item.id));
    }

    return [
      ProductDto.fromMany(items),
      PaginationSummaryDto.from(queryObject, total),
    ];
  }

  async getItem(id: EntityId, queryObject: QueryObject) {
    const item = await this.repository.findById(id);
    /*
    // test
    // queryObject = { ...queryObject, filter: { id } };
    // queryObject = { ...queryObject, filter: { price: 399 } };
    // queryObject = { ...queryObject, filter: { price: 399, in_stock: true } };
    queryObject = {
      ...queryObject,
      filter: { in_stock: true },
      // sort: [{ field: "price", direction: "asc" }],
    };
    const item = await this.repository.findOne(appQuery, queryObject);
    */
    if (!item) throw AppError.NotFound();

    // get expansions
    if (queryObject?.include?.includes("reviews")) {
      Object.assign(item, await this.getProductReviews(item.id));
    }

    return ProductDto.from(item);
  }

  async createItem(createItemDto: CreateProductDto) {
    const newItem = await this.repository.create(createItemDto);
    return ProductDto.from(newItem);
  }

  async updateItem(id: EntityId, updateItemDto: UpdateProductDto) {
    const updatedItem = await this.repository.update(id, updateItemDto);
    if (!updatedItem) throw AppError.NotFound();

    return ProductDto.from(updatedItem);
  }

  async deleteItem(id: EntityId) {
    const deleted = await this.repository.delete(id);
    if (!deleted) throw AppError.NotFound();

    return deleted;
  }

  private async getProductReviews(id: EntityId) {
    const reviews = await this.reviewRepository.findAllByProductId(id);
    return reviews ?? {};
  }
}
