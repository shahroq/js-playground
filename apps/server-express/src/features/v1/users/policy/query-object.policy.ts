import { defaultPolicy } from "@/common/query-object/default.policy";
import type { QueryObjectPolicy } from "@/common/query-object/types";

export const policyShow: QueryObjectPolicy = {
  ...defaultPolicy,
  includableCollections: [],
  selectableFields: ["id", "name", "email", "role"],
};

export const policyList: QueryObjectPolicy = {
  ...policyShow,
  allowedKeys: ["fields", "filter", "page", "sort", "filter"],
  sortableFields: ["id", "created_at", "email", "role"],
  filterableFields: ["id", "role"],
};
