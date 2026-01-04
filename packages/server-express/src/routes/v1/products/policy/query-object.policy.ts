import { defaultPolicy } from "@/common/query-object/default.policy";
import type { QueryObjectPolicy } from "@/common/query-object/types";

export const policyShow: QueryObjectPolicy = {
  ...defaultPolicy,
  includableCollections: ["reviews"],
  selectableFields: [
    "id",
    "name",
    "description",
    "price",
    "category",
    "in_stock",
  ],
};

export const policyList: QueryObjectPolicy = {
  ...policyShow,
  allowedKeys: ["fields", "filter", "page", "sort", "filter"],
  sortableFields: ["id", "created_at", "name", "category", "price"],
  filterableFields: ["id", "name", "category", "price", "in_stock"],
};
