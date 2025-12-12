import type { QueryOptions } from "@/common/app-query/types";

// default query options (to be merged in every module)
export const queryOptions: QueryOptions = {
  defaultLimit: 4,
  defaultOrderBy: { sort: "id", direction: "asc" },
  selectableFields: ["id"],
  sortableFields: ["id"],
  filterableFields: ["id"],
  searchableFields: [],
  expandableCollections: [],
};
