import { config, utils } from "@/common/container";

export interface DatabaseSchema {
  [collection: string]: any[] | string | Record<string, any>;
}

export const defaultData = {
  meta: {
    version: config.version,
    orm: "memory",
    database: "json",
    created_at: utils.formatISO(),
    updated_at: utils.formatISO(),
  },
  users: [],
  products: [],
  reviews: [],
};
