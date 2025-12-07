import type { EntityId, IMeta, INormQuery } from "@/common/types";
import type { Product } from "@/routes/v1/products/types";

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
