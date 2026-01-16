import type { EntityId } from "@/common/types";
import type { IReview } from "../types";
import type { ReviewStatus } from "@root/generated/prisma/enums";
import { ProductDto } from "@/common/container";

export type ReviewAggregateDto = {
  reviews: ReviewDto[];
  review_count: number;
  average_rating: number;
};

// Response DTO
export class ReviewDto {
  private constructor(
    public readonly id: EntityId,
    public readonly product_id: EntityId,
    public readonly content: string,
    public readonly rating: number,
    public readonly status: ReviewStatus,
    public readonly submitted_at: Date,
    public readonly product?: ProductDto
  ) {}

  static from(entity: IReview): ReviewDto {
    return new ReviewDto(
      entity.id,
      entity.product_id,
      entity.content,
      entity.rating,
      entity.status,
      entity.created_at,
      entity.product ? ProductDto.from(entity.product) : undefined
    );
  }

  static fromMany(entities: IReview[] = []): ReviewDto[] {
    return entities.map((entity) => ReviewDto.from(entity));
  }

  static fromManyWithAggregate(
    entities: IReview[] = [],
    review_count: number = 0,
    average_rating: number = 0
  ): ReviewAggregateDto {
    return {
      reviews: entities.map((entity) => ReviewDto.from(entity)),
      review_count: review_count ?? 0,
      average_rating: average_rating ? Number(average_rating.toFixed(2)) : 0,
    };
  }
}
