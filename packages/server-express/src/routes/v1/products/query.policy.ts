import type { QueryPolicy } from "@/common/query/types";
import { queryPolicy as defaultQueryPolicy } from "@/common/query/default.policy";

export const queryPolicy: QueryPolicy = {
  ...defaultQueryPolicy,
  defaultLimit: 3,
  defaultOrderBy: { sort: "id", direction: "asc" },
  selectableFields: ["id", "name", "category", "price", "in_stock"],
  sortableFields: ["id", "name", "price", "created_at"],
  filterableFields: ["id", "name", "category", "price", "in_stock"],
  searchableFields: ["name", "description"],
  expandableCollections: ["reviews"],
};
