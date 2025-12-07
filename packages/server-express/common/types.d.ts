export type EntityId = number | string;
export type CollectionName = "users" | "products" | "reviews";

export type Awaitable<T> = T | Promise<T>;

export interface IMeta {
  page?: number;
  per_page?: number;
  total_pages?: number;
  total_count?: number;
  has_next_page?: boolean;
  has_prev_page?: boolean;
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
