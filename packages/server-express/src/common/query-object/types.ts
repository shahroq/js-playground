import type { CollectionName } from "../types";

export type Include = string[];
export type Fields = Record<string, string[]>;
export type Page = { number?: number; size?: number };
export type Sort = { field: string; direction: "asc" | "desc" }[];
export type Filter = Record<string, any>;

export type QueryObject = {
  include?: Include;
  fields?: Fields;
  page?: Page;
  sort?: Sort;
  filter?: Filter;
};

export type QueryObjectPolicy = {
  allowedKeys: (keyof QueryObject)[];
  //JOIN
  includableCollections?: CollectionName[]; // whitelis
  // SELECT
  selectableFields?: string[]; // whitelist
  // Limit
  limit?: number;
  maxLimit?: number;
  // Order By
  defaultOrderBy?: string;
  sortableFields?: string[]; // whitelist
  // WHERE
  filterableFields?: string[]; // whitelist
  searchableFields?: string[]; // whitelist
};
