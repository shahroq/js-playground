export interface IRawQuery {
  page?: number | string;
  per_page?: number | string;

  sort?: string; // field name
  direction?: "asc" | "desc";

  fields?: string[];

  include?: CollectionName[];

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

export type Selection = {
  fields?: string[];
};

export type Expansion = {
  include?: CollectionName[];
};

// Normalized query params after processing
export interface INormQuery {
  pagination?: Pagination;
  orderBy?: OrderBy;
  filter?: Filter;
  selection?: Selection;
  expansion?: Expansion;
}
