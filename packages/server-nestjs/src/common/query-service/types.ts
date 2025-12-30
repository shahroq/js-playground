import type { OrderByQueryDto, PaginationQueryDto } from './query.dto';

export type QueryPolicy = {
  defaultLimit?: number;
  defaultOrderBy?: OrderBy;
  selectableFields?: string[]; // whitelist for SELECT
  sortableFields?: string[]; // whitelist for ORDER BY
  filterableFields?: string[]; // whitelist for WHERE
  searchableFields?: string[]; // whitelist for WHERE
  expandableCollections?: string[]; // whitelist for JOIN (sub collections)
};

export type Pagination = PaginationQueryDto & { offset: number };
export type OrderBy = OrderByQueryDto;

// Normalized query params after processing
export type NormQuery = {
  pagination?: Pagination;
  orderBy?: OrderBy;
};

// --- Normalized Query DTO For `Show` End Points ---
export type NormQueryShow = {};

// --- Normalized Query DTO For List End Points ---
export type NormQueryList = {
  pagination?: PaginationQueryDto;
  orderBy?: OrderByQueryDto;
} & NormQueryShow;
