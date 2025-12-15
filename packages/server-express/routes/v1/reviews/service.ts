import { ReviewStatus } from "./types.d";
import {
  AppError,
  AppQuery,
  config,
  PaginationSummaryDto,
} from "@/common/container";
import type { EntityId } from "@/common/types";
import { ReviewRepository } from "./repository";
import { ProductRepository } from "@products/repository";
import { ReviewDto, CreateReviewDto, UpdateReviewDto } from "./dto";

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

    // TODO: abstract away
    // get expansions: products
    if (appQuery.normQuery.expansion?.include?.includes("products")) {
      items = await Promise.all(
        items.map(async (item) => {
          // get product
          const product = await this.productRepository.findById(
            item.product_id
          );
          return { ...item, product: product ?? undefined };
        })
      );
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

    // get expansions: products
    // TODO: abstract away
    if (appQuery.normQuery.expansion?.include?.includes("products")) {
      const product = await this.productRepository.findById(
        item?.product_id as EntityId
      );
      if (item && product) item.product = product;
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

  async deleteItem(id: EntityId): Promise<boolean> {
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
}
