import config from "@/common/config/config";
import { isoString } from "@/common/utils/utils";

export interface DatabaseSchema {
  [collection: string]: any[] | string | Record<string, any>;
}

export const defaultData = {
  meta: {
    version: config.version,
    orm: "lowdb",
    database: "json",
    created_at: isoString(),
    updated_at: isoString(),
  },
  users: [],
  products: [],
  reviews: [],
};
