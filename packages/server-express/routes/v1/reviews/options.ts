import type { QueryOptions } from "@/common/query-object/types";

export const queryOptions: QueryOptions = {
  defaultLimit: 4,
  defaultOrderBy: { sort: "id", direction: "asc" },
  selectableFields: ["id", "content", "rating", "product_id"],
  sortableFields: ["id", "title", "created_at"],
  filterableFields: ["id", "product_id"],
  searchableFields: [],
  expandableCollections: ["products"],
};
