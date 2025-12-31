import type { QueryPolicy } from "@/common/query/types";
import { queryPolicy as defaultQueryPolicy } from "@/common/query/default.query-policy";

export const queryPolicy: QueryPolicy = {
  ...defaultQueryPolicy,
  defaultLimit: 3,
  defaultOrderBy: { sort: "id", direction: "asc" },
  selectableFields: ["id", "name", "email", "role"],
  sortableFields: ["id", "role"],
  filterableFields: ["id", "role"],
  searchableFields: ["name"],
  expandableCollections: [],
};
