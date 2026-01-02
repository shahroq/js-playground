import type { QueryObjectPolicy } from "./types";

// default query object policy (to be merged in every module)
export const defaultPolicy: QueryObjectPolicy = {
  allowedKeys: ["include", "fields"],
  includableCollections: undefined,
  selectableFields: undefined,
  defaultLimit: 10,
  maxLimit: 20,
  defaultOrderBy: "-created_at, -id",
  sortableFields: ["created_at", "id"],
  filterableFields: undefined,
  searchableFields: undefined,
};
