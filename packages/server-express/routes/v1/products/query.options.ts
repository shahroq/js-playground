import type { QueryOptions } from "@/common/query/types";
import { queryOptions as defaultQueryOptions } from "@/common/query/default.options";

export const queryOptions: QueryOptions = {
  ...defaultQueryOptions,
  defaultLimit: 3,
  defaultOrderBy: { sort: "id", direction: "asc" },
  selectableFields: ["id", "name", "category", "price", "in_stock"],
  sortableFields: ["id", "name", "price", "created_at"],
  filterableFields: ["id", "name", "category", "price", "in_stock"],
  searchableFields: ["name", "description"],
  expandableCollections: ["reviews"],
};
