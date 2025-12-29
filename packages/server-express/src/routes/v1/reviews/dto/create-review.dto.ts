import type { EntityId } from "@/common/types";
import type { ReviewStatus } from "@root/generated/prisma/enums";

// Request DTO
export class CreateReviewDto {
  readonly product_id: EntityId;
  readonly content: string;
  readonly rating: number;
  readonly status?: ReviewStatus;
}
