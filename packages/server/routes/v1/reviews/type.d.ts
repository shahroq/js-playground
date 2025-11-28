import type { EntityId, IMeta, INormQuery } from "@/common/type";
import type { Product } from "@products/type";

export interface Review {
  id?: EntityId;
  product_id: number;
  content: string;
  rating: number;
  created_at: Date;
  updated_at: Date;
  created_by: number;
  updated_by: number;

  product?: Product;
}

export interface IReviewQuery extends INormQuery {}

export interface IReviewResult {
  item?: Review;
  items?: Review[];
  meta?: IMeta;
}
