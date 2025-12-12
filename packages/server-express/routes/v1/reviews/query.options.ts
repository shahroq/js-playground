import type { QueryOptions } from "@/common/app-query/types";
import { queryOptions as defaultQueryOptions } from "@/common/app-query/default.options";

export const queryOptions: QueryOptions = {
  ...defaultQueryOptions,
  defaultLimit: 4,
  defaultOrderBy: { sort: "id", direction: "asc" },
  selectableFields: ["id", "content", "rating", "status", "product_id"],
  sortableFields: ["id", "title", "status", "created_at"],
  filterableFields: ["id", "product_id", "status"],
  searchableFields: ["title"],
  expandableCollections: ["products"],
};
