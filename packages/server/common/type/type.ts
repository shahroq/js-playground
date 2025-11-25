export type EntityId = number | string;
export type CollectionName = "users" | "products" | "reviews";

export interface IRawQuery {
  page?: number | string;
  per_page?: number | string;

  sort?: string; // field name
  direction?: "asc" | "desc";

  // other dynamic fields allowed
  [key: string]: unknown;
}

export type Pagination = {
  page: number;
  per_page: number;
  offset: number;
};

export type OrderBy = {
  sort: string;
  direction: "asc" | "desc";
};

export type Filter = Record<string, any>;

// Normalized query params after processing
export interface INormQuery {
  pagination?: Pagination;
  orderBy?: OrderBy;
  filter?: Filter;
}

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
