import type { EntityId, IMeta, INormQuery } from "@/common/type/type";

export interface Review {
  id?: EntityId;
  product_id: number;
  content: string;
  rating: number;
  created_at: Date;
  updated_at: Date;
  created_by: number;
  updated_by: number;
}

export interface IReviewQuery extends INormQuery {}

export interface IReviewResult {
  item?: Review;
  items?: Review[];
  meta?: IMeta;
}
