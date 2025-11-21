export type EntityId = number | string;

export interface IRawQuery {
  page?: number | string;
  per_page?: number | string;
  /*
  order?: string; // field name
  direction?: "asc" | "desc";
  */
}

// Normalized query params after processing
export interface INormalizedQuery {
  page: number;
  per_page: number;
  offset: number;

  /*
  orderBy?: {
    field: string;
    direction: "asc" | "desc";
  };
  filter?: {}
  */
}

export interface IMeta {
  page?: number;
  per_page?: number;
  total_page?: number;
  total_count?: number;
}

/*
export interface QueryFilter<T> {
  where?: Partial<T> | ((item: T) => boolean);
  limit?: number;
  offset?: number;
  orderBy?: {
    field: keyof T;
    direction: "asc" | "desc";
  };
}

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
