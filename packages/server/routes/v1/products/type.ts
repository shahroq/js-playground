import type { EntityId } from "@/common/type";
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

export interface ProductWithReviews extends Product {
  reviews: Review[];
  averageRating: number;
  reviewCount: number;
}
