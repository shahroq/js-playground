import type { EntityId, IMeta, INormQuery } from "@/common/types";
import type { Review } from "@/routes/v1/reviews/types";

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
  review_count?: number; // number of ...
  average_rating?: number | null; // average of ...
}

export interface IProductResult {
  item?: Product;
  items?: Product[];

  meta?: IMeta;
}

export interface IProductQuery extends INormQuery {
  /*
  id?: EntityId;
  search?: string;
  categoryId?: number;
  */
}
