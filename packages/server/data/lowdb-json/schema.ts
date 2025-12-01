import { config, utils } from "@/common/container.ts";

export interface DatabaseSchema {
  [collection: string]: any[] | string | Record<string, any>;
}

export const defaultData = {
  meta: {
    version: config.version,
    orm: "lowdb",
    database: "json",
    created_at: utils.isoString(),
    updated_at: utils.isoString(),
  },
  users: [],
  products: [],
  reviews: [],
};
