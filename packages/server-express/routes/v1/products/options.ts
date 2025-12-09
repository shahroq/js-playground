import type { QueryOptions } from "@/common/query-object/types";

export const queryOptions: QueryOptions = {
  defaultPerPage: 3,
  selectableFields: ["id", "name", "category", "price", "in_stock"],
  defaultOrder: { sort: "id", direction: "asc" },
  allowedSortFields: ["id", "name", "price", "created_at"],
  searchableFields: ["name", "description"],
  filterableFields: ["id", "name", "category", "price", "in_stock"],
  expandableCollections: ["reviews"],
};
