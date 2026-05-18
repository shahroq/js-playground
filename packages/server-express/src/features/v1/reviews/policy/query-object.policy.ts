import { defaultPolicy } from "@/common/container";
import type { QueryObjectPolicy } from "@/common/query-object/types";

export const policyShow: QueryObjectPolicy = {
  ...defaultPolicy,
  includableCollections: ["products"],
  selectableFields: ["id", "content", "rating", "status"],
};

export const policyList: QueryObjectPolicy = {
  ...policyShow,
  allowedKeys: ["fields", "filter", "page", "sort", "filter"],
  sortableFields: ["id", "created_at", "rating", "product_id"],
  filterableFields: ["id", "rating", "product_id"],
};
