import type { CollectionName } from "../types";

export class PaginationQueryDto {
  page?: number;
  per_page?: number;
  // offset: number;
}

export class OrderByQueryDto {
  sort?: string;
  direction?: "asc" | "desc";
}

export class SelectionQueryDto {
  fields?: string[];
}

export class ExpansionQueryDto {
  include?: CollectionName[];
}

export class FilterQueryDto {
  [key: string]: unknown;
}

// repetitive, but no options here
export type QueryDto = {
  // Pagination (LIMIT)
  page?: number;
  per_page?: number;

  // OrderBy (ORDER BY)
  sort?: string; // field name
  direction?: "asc" | "desc";

  // Selection (SELECT)
  fields?: string[];

  // Expansion (JOIN)
  include?: CollectionName[];

  // Filters (WHERE) other dynamic fields allowed
  [key: string]: unknown;
};
