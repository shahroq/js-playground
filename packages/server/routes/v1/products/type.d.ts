import type { EntityId, IMeta, INormQuery } from "@/common/type";
import type { Review } from "@reviews/type";

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

  reviews?: Review[];
}

export interface IProductQuery extends INormQuery {
  // id?: EntityId;
  /*
  search?: string;
  categoryId?: number;
  */
}

export interface IProductResult {
  item?: Product;
  items?: Product[];
  meta?: IMeta;
}

export interface IProductResultWithReviews extends IProductResult {
  reviews?: Review[];
  review_count?: number;
  average_rating?: number | null;
}
