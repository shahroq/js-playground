import type { QueryPolicy } from "@/common/query/types";

// default query policy (to be merged in every module)
export const queryPolicy: QueryPolicy = {
  defaultLimit: 4,
  defaultOrderBy: { sort: "id", direction: "asc" },
  selectableFields: ["id"],
  sortableFields: ["id"],
  filterableFields: ["id"],
  searchableFields: [],
  expandableCollections: [],
};
