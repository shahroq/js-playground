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
  defaultPerPage?: number;
  selectableFields: string[]; // whitelist
  defaultOrder?: OrderBy;
  allowedSortFields?: string[]; // whitelist for sort validation
  searchableFields?: string[]; // for q/search handling
  filterableFields?: string[]; // whitelist
  expandableCollections?: CollectionName[]; // whitelist
}

declare global {
  namespace Express {
    interface Request {
      normQuery?: {
        pagination: Pagination;
        orderBy?: OrderBy;
        filters: Filter;
        selection: Selection;
        expansion: Expansion;
      };
    }
  }
}
