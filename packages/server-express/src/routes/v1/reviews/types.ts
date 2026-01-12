import type { EntityId } from "@/common/types";
import type { IProduct } from "@/routes/v1/products/types";

export enum ReviewStatus {
  APPROVED = "APPROVED",
  PENDING = "PENDING",
  REJECTED = "REJECTED",
}

// raw review (from db): entity(?)
export interface IReview {
  id: EntityId;
  product_id: number;
  content: string;
  rating: number;
  status: ReviewStatus;
  created_at: Date;
  updated_at: Date;
  created_by: number;
  updated_by: number;

  product?: IProduct;
}

// extraneous? to remove/only used in findAllByProductId() [which should be refactored]
/*
export interface IReviewResult {
  item?: IReview;
  items?: IReview[];

  total_count?: number;
  average_rating?: float;

  meta?: IMeta;
}
*/

// dto?
// export interface IReviewQuery extends NormQuery {}
