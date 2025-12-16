import { ProductDto } from "@products/dto";
import type { PaginationSummaryDto } from "@/common/container";
import type { EntityId } from "@/common/types";
import type { IReview } from "./types";
import type { ReviewStatus } from "@/generated/prisma/enums";

// Request Dto s
export class CreateReviewDto {
  readonly product_id: EntityId;
  readonly content: string;
  readonly rating: number;
  readonly status?: ReviewStatus;
}

export class UpdateReviewDto implements Partial<CreateReviewDto> {
  readonly product_id?: EntityId;
  readonly content?: string;
  readonly rating?: number;
  readonly status?: ReviewStatus;
}

// possible as it has no behavior?
// export type UpdateReviewDto = Partial<CreateReviewDto>;

// Response Dto s
export class ReviewDto {
  private constructor(
    public readonly id: EntityId,
    public readonly product_id: EntityId,
    public readonly content: string,
    public readonly rating: number,
    public readonly status: ReviewStatus,
    public readonly submitted_at: Date,
    public readonly product: ProductDto
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

  static fromMany(entities: IReview[]): ReviewDto[] {
    return entities.map((entity) => ReviewDto.from(entity));
  }
}

// extraneous?
export class ReviewListDto {
  readonly reviews: ReviewDto[];

  // readonly total_count?: number;
  // readonly average_rating?: number;

  readonly meta?: PaginationSummaryDto;
}
