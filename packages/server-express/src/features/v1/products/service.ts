import {
  AppError,
  ProductDto,
  CreateProductDto,
  UpdateProductDto,
  PaginationSummaryDto,
  ReviewDto,
  t,
} from "@/common/container";
import type { EntityId } from "@/common/types";
import { ProductRepository } from "./repository";
import { ReviewRepository } from "@/features/v1/reviews/repository";
import type { QueryObject } from "@/common/query-object/types";
import type { IReview } from "../reviews/types";
import type { ILlmClientService } from "@/common/llm-client/llm-client-service.interface";

export class ProductService {
  constructor(
    private readonly repository: ProductRepository,
    private readonly reviewRepository: ReviewRepository,
    private readonly llmClientService: ILlmClientService
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

  /**
   *
   * @param id
   * @returns product reviews with review_count & average_rating
   */
  async getProductReviews(id: EntityId) {
    const { reviews, review_count, average_rating } =
      await this.reviewRepository.findAllByProductId(id);

    const summary = reviews
      ? await this.getProductReviewsSummary(reviews)
      : undefined;

    return reviews
      ? ReviewDto.fromManyWithAggregate(
          reviews,
          review_count,
          average_rating,
          summary
        )
      : undefined;
  }

  // TODO: better place for this? review service?
  async getProductReviewsSummary(reviews: IReview[]) {
    const joinedReviews = reviews.map((r) => r.content).join("\n\n");
    const prompt = t("PROMPT.SUMMARIZE_PRODUCT_REVIEWS", { joinedReviews });

    const summary = await this.llmClientService.generateText({ prompt });

    return summary;
  }
}
