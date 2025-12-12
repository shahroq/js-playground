import type { EntityId, IMeta, INormQuery } from "@/common/types";
import type { Product } from "@/routes/v1/products/types";

export enum ReviewStatus {
  APPROVED = "APPROVED",
  PENDING = "PENDING",
  REJECTED = "REJECTED",
}

export interface Review {
  id?: EntityId;
  product_id: number;
  content: string;
  rating: number;
  status: ReviewStatus;
  created_at: Date;
  updated_at: Date;
  created_by: number;
  updated_by: number;

  product?: Product;
}

export interface IReviewResult {
  item?: Review;
  items?: Review[];

  total_count?: number;
  average_rating?: float;

  meta?: IMeta;
}

export interface IReviewQuery extends INormQuery {}
