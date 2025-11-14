export type EntityId = number | string;

export interface User {
  id?: EntityId;
  name: string;
  email: string;
  role: string;
  created_at?: Date;
  updated_at?: Date;
  created_by?: number;
  updated_by?: number;
}

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

export interface ProductWithReviews extends Product {
  reviews: Review[];
  averageRating: number;
  reviewCount: number;
}

/*
export interface Category {
  id?: EntityId;
  title: string;
  created_at: Date;
  updated_at: Date;
  created_by: number;
  updated_by: number;
}
// add properties like guitar selection  
*/
