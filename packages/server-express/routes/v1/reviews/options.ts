import type { QueryOptions } from "@/common/query-object/types";

export const queryOptions: QueryOptions = {
  defaultPerPage: 4,
  selectableFields: ["id", "content", "rating", "product_id"],
  defaultOrder: { sort: "id", direction: "asc" },
  allowedSortFields: ["id", "title", "created_at"],
  searchableFields: [],
  filterableFields: ["id", "product_id"],
  expandableCollections: ["products"],
};
