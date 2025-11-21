import type { EntityId, IMeta, INormalizedQuery } from "@/common/type/type";
import type { Review } from "../reviews/type";

export interface Product {
  id?: EntityId;
  name: string;
  description?: string;
  price: number;
  category: string;
  in_stock: boolean;
  created_at?: Date;
  updated_at?: Date;
  created_by?: number;
  updated_by?: number;
}

export interface IProductQuery extends INormalizedQuery {
  // id?: EntityId;
  /*
  search?: string;
  categoryId?: number;
  */
}

export interface IProductResult {
  products: Product[];
  meta?: IMeta;
}

export interface IProductWithReviewsResult extends IProductResult {
  reviews: Review[];
  averageRating: number;
  reviewCount: number;
}
