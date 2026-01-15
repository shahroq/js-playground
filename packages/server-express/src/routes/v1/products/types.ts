import type { EntityId, IMeta } from "@/common/types";
import type { IReview } from "@/routes/v1/reviews/types";

// raw product (from db/entity?)
export interface IProduct {
  id: EntityId;
  name: string;
  description: string;
  price: number;
  category: string;
  in_stock: boolean;
  created_at: Date;
  updated_at: Date;
  created_by: number;
  updated_by: number;

  reviews?: IReview[];
  review_count?: number; // number of ...
  average_rating?: number; // average of ...
}

// extraneous?
export interface IProductResult {
  item?: IProduct;
  items?: IProduct[];

  meta?: IMeta;
}
/*
export interface IProductQuery extends NormQuery {
  id?: EntityId;
  search?: string;
  categoryId?: number;
}
  */
