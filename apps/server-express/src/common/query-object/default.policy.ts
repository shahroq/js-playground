import { config } from "@/common/container";
import type { QueryObjectPolicy } from "./types";

// default query object policy (to be merged in every module)
export const defaultPolicy: QueryObjectPolicy = {
  allowedKeys: ["include", "fields"],
  includableCollections: undefined,
  selectableFields: undefined,
  limit: config.default.pagination_limit || 3,
  maxLimit: config.default.pagination_max_limit || 5,
  defaultOrderBy: "-created_at, -id",
  sortableFields: ["created_at", "id"],
  filterableFields: undefined,
  searchableFields: undefined,
};
