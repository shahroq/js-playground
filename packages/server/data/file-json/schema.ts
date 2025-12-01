import { config, utils } from "@/common/container";

export interface DatabaseSchema {
  [collection: string]: any[] | string | Record<string, any>;
}

export const defaultData = {
  meta: {
    version: config.version,
    orm: "file",
    database: "json",
    created_at: utils.isoString(),
    updated_at: utils.isoString(),
  },
  users: [],
  products: [],
  reviews: [],
};
