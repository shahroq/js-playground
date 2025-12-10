export interface IRawQuery {
  // pagination
  page?: number | string;
  per_page?: number | string;
  // sort
  sort?: string; // field name
  direction?: "asc" | "desc";
  // selection
  fields?: string[];
  // expansion
  include?: CollectionName[];
  // filter: other dynamic fields allowed
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

export interface QueryOptions {
  defaultLimit?: number;
  defaultOrderBy?: OrderBy;
  selectableFields: string[]; // whitelist for SELECT
  sortableFields?: string[]; // whitelist for ORDER BY
  filterableFields?: string[]; // whitelist for WHERE
  searchableFields?: string[]; // whitelist for WHERE
  expandableCollections?: CollectionName[]; // whitelist for JOIN (sub collections)
}

declare global {
  namespace Express {
    interface Request {
      normQuery?: INormQuery;
    }
  }
}
