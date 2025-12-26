import type { CollectionName } from "@/common/types";

import type {
  ExpansionQueryDto,
  FilterQueryDto,
  OrderByQueryDto,
  PaginationQueryDto,
  SelectionQueryDto,
} from "./dto";

export type QueryPolicy = {
  defaultLimit?: number;
  defaultOrderBy?: OrderBy;
  selectableFields?: string[]; // whitelist for SELECT
  sortableFields?: string[]; // whitelist for ORDER BY
  filterableFields?: string[]; // whitelist for WHERE
  searchableFields?: string[]; // whitelist for WHERE
  expandableCollections?: CollectionName[]; // whitelist for JOIN (sub collections)
};

export type Pagination = PaginationQueryDto & { offset: number };
export type OrderBy = OrderByQueryDto;
export type Filter = FilterQueryDto;
export type Selection = SelectionQueryDto;
export type Expansion = ExpansionQueryDto;

// Normalized query params after processing
export type NormQuery = {
  pagination?: Pagination;
  orderBy?: OrderBy;
  filter?: Filter;
  selection?: Selection;
  expansion?: Expansion;
};

// --- Normalized Query DTO For `Show` End Points ---
export type NormQueryShow = {
  selection?: SelectionQueryDto;
  expansion?: ExpansionQueryDto;
};

// --- Normalized Query DTO For List End Points ---
export type NormQueryList = {
  pagination?: PaginationQueryDto;
  orderBy?: OrderByQueryDto;
  filters?: FilterQueryDto;
} & NormQueryShow;

// --- Extend Express Request ---
declare global {
  namespace Express {
    interface Request {
      normQuery?: NormQueryShow | NormQueryList;
    }
  }
}
