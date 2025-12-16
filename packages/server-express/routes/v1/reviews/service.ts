import { ReviewStatus } from "./types.d";
import {
  AppError,
  AppQuery,
  config,
  PaginationSummaryDto,
  ReviewDto,
  CreateReviewDto,
  UpdateReviewDto,
} from "@/common/container";
import type { EntityId } from "@/common/types";
import { ReviewRepository } from "./repository";
import { ProductRepository } from "@products/repository";

export class ReviewService {
  constructor(
    private readonly repository: ReviewRepository,
    private readonly productRepository: ProductRepository
  ) {}

  async getItems(appQuery: AppQuery) {
    // add status filter all the times
    appQuery.append({ status: ReviewStatus.APPROVED });

    let [items, total] = await Promise.all([
      this.repository.findAll(appQuery),
      this.repository.count(appQuery),
    ]);

    // get expansions: products
    // TODO: not performatnt, get'em with WHERE IN query
    const expansionList = appQuery.normQuery?.expansion?.include ?? [];
    if (expansionList.includes("products")) {
      for (const item of items)
        item.product = await this.getReviewProduct(item.product_id);
    }

    return [
      ReviewDto.fromMany(items),
      PaginationSummaryDto.from(appQuery, total),
    ];
  }

  async getItem(id: EntityId, appQuery: AppQuery) {
    appQuery.append({ id });
    // add status filter all the times
    // appQuery.append({ status: ReviewStatus.APPROVED });

    const item = await this.repository.findOne(appQuery);
    if (!item) throw AppError.notFound();

    // get expansions
    const expansionList = appQuery.normQuery?.expansion?.include ?? [];
    if (expansionList.includes("products")) {
      item.product = await this.getReviewProduct(item.product_id);
    }

    return ReviewDto.from(item);
  }

  async createItem(createItemDto: CreateReviewDto) {
    if (!createItemDto?.status)
      createItemDto = {
        ...createItemDto,
        status: config.default.review_status,
      };

    const newItem = await this.repository.create(createItemDto);
    return ReviewDto.from(newItem);
  }

  async updateItem(id: EntityId, updateItemDto: UpdateReviewDto) {
    // check if this is updatable
    // const appQuery = new AppQuery({ id, status: ReviewStatus.PENDING });
    // const existingReview = await this.repository.findOne(appQuery);
    //...

    const updatedItem = await this.repository.update(+id, updateItemDto);
    if (!updatedItem) throw AppError.notFound();

    return ReviewDto.from(updatedItem);
  }

  async deleteItem(id: EntityId) {
    const deleted = await this.repository.delete(+id);
    if (!deleted) throw AppError.notFound();

    return deleted;
  }

  async approveItem(id: EntityId): Promise<ReviewDto> {
    const updatingReview = await this.repository.findById(+id);
    if (!updatingReview) throw AppError.notFound();

    if (updatingReview.status !== ReviewStatus.PENDING)
      throw new AppError("Only PENDING reviews can be APPROVED");

    /*
    why not call update insteda of new method: updateStatus
    gpt: Status Change: Service/Repo Responsibility
    - Repository update() makes illegal writes easy
    - Repositories should encode write intent, not just writes
    - Data invariants belong in the repository too
    - Repository methods are commands, not helpers
    - Side effects & atomicity: Status changes often require atomic updates. If you rely on generic update(): Callers might forget fields
     */
    const updatedItem = await this.repository.updateStatus(
      +id,
      ReviewStatus.APPROVED
    );
    if (!updatedItem) throw AppError.notFound();

    return ReviewDto.from(updatedItem);
  }

  async rejectItem(id: EntityId): Promise<ReviewDto> {
    const updatingReview = await this.repository.findById(+id);
    if (!updatingReview) throw AppError.notFound();

    if (updatingReview.status !== ReviewStatus.PENDING)
      throw new AppError("Only PENDING reviews can be REJECTED");

    const updatedItem = await this.repository.updateStatus(
      +id,
      ReviewStatus.REJECTED
    );
    if (!updatedItem) throw AppError.notFound();

    return ReviewDto.from(updatedItem);
  }

  private async getReviewProduct(id: EntityId) {
    const product = await this.productRepository.findById(id);
    return product ?? {};
  }
}
