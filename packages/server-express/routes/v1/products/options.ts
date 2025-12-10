import type { QueryOptions } from "@/common/query-object/types";

export const queryOptions: QueryOptions = {
  defaultLimit: 3,
  defaultOrderBy: { sort: "id", direction: "asc" },
  selectableFields: ["id", "name", "category", "price", "in_stock"],
  sortableFields: ["id", "name", "price", "created_at"],
  filterableFields: ["id", "name", "category", "price", "in_stock"],
  searchableFields: ["name", "description"],
  expandableCollections: ["reviews"],
};
