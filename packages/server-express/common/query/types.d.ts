export interface QueryPolicy {
  defaultLimit?: number;
  defaultOrderBy?: OrderBy;
  selectableFields: string[]; // whitelist for SELECT
  sortableFields?: string[]; // whitelist for ORDER BY
  filterableFields?: string[]; // whitelist for WHERE
  searchableFields?: string[]; // whitelist for WHERE
  expandableCollections?: CollectionName[]; // whitelist for JOIN (sub collections)
}

// Normalized query params after processing
export interface INormQuery {
  pagination?: Pagination;
  orderBy?: OrderBy;
  filter?: Filter;
  selection?: Selection;
  expansion?: Expansion;
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

export interface IRawQuery {
  // Selection (LIMIT)
  page?: number | string;
  per_page?: number | string;

  // OrderBy (ORDER BY)
  sort?: string; // field name
  direction?: "asc" | "desc";

  // Selection (SELECT)
  fields?: string[];

  // Expansion (JOIN)
  include?: CollectionName[];

  // Filters (WHERE) other dynamic fields allowed
  [key: string]: unknown;
}
