import { config } from "@/common/container";
import type { QueryOptions } from "@/common/query-object/types";
import type { Request, NextFunction } from "express";
import type {
  Expansion,
  Filter,
  OrderBy,
  Pagination,
  Selection,
} from "./types";
import type { CollectionName } from "../types";

const RESERVED_KEYS = [
  "page",
  "per_page",
  "sort",
  "direction",
  "fields",
  "include",
];

export function normalizeQueryHandler(dto?: any, queryOptions?: QueryOptions) {
  // 1. normalize based on dto/options
  return (req: Request, _: any, next: NextFunction) => {
    const q = req.query;

    req.normQuery = {
      pagination: normalizePagination(q, queryOptions),
      orderBy: normalizeOrderBy(q, queryOptions),
      filter: normalizeFilters(q, queryOptions),
      selection: normalizeSelection(q, queryOptions),
      expansion: normalizeExpansion(q, queryOptions),
    };

    next();
  };
}

function normalizePagination(q: any, options?: QueryOptions): Pagination {
  const { defaultLimit } = options ?? {};

  const page = +q.page || 1;
  const per_page =
    +q.per_page || defaultLimit || config.global_pagination_limit;
  const offset = (page - 1) * per_page;

  return { page, per_page, offset };
}

function normalizeOrderBy(q: any, options?: QueryOptions): OrderBy | undefined {
  let { sort, direction } = q;
  const { defaultOrderBy, sortableFields } = options ?? {};

  if (!sort) return options?.defaultOrderBy || undefined;

  sort = sort ?? undefined;
  direction = direction === "desc" ? "desc" : "asc";

  // reject invalid sort fields
  if (!sortableFields || !sortableFields.includes(sort)) return defaultOrderBy;

  return sort !== undefined ? { sort, direction } : undefined;
}

function normalizeSelection(
  q: any,
  options?: QueryOptions
): Selection | undefined {
  const { fields } = q;
  const { selectableFields } = options ?? {};

  // if (!fields) return { fields: selectableFields };
  if (!fields) return undefined;

  // Convert include to array of strings
  const fieldsAr = parseAsArray(`${fields}`);

  // Filter only allowed collections and assert type
  const fieldsRefined = fieldsAr.filter(
    (f) => selectableFields?.includes(f) ?? false
  );

  return fieldsRefined.length > 0 ? { fields: fieldsRefined } : undefined;
}

function normalizeExpansion(
  q: any,
  options?: QueryOptions
): Expansion | undefined {
  const { include } = q;
  const { expandableCollections } = options ?? {};

  if (!include) return undefined;

  // Convert include to array of strings
  const includeAr = parseAsArray(`${include}`);

  // Filter only allowed collections and assert type
  const includeRefined: CollectionName[] = includeAr.filter(
    (c): c is CollectionName =>
      expandableCollections?.includes(c as CollectionName) ?? false
  );

  return includeRefined.length > 0 ? { include: includeRefined } : undefined;
}

export function normalizeFilters(
  q: any,
  options?: QueryOptions
): Filter | undefined {
  const { filterableFields } = options ?? {};

  const filter: Filter = {};

  if (!filterableFields || filterableFields.length === 0) return undefined;

  for (const [key, value] of Object.entries(q)) {
    // skip reserved keys
    if (RESERVED_KEYS.includes(key)) continue;

    // only accept fields explicitly allowed
    if (!filterableFields.includes(key)) continue;

    // ignore undefined/null
    if (value === undefined || value === null) continue;

    filter[key] = coerce(value);
  }

  return Object.keys(filter).length > 0 ? filter : undefined;
}

/**
 * Correct types
 */
function coerce(v: any) {
  if (typeof v !== "string") return v;

  // boolean
  if (v === "true") return true;
  if (v === "false") return false;

  // number (int or float)
  if (!isNaN(Number(v))) return Number(v);

  return v; // leave as string
}

/**
 * Parse comma-separated strings/qs to array of string
 * "[reviews,users]" -> ["reviews", "users"]
 * reviews,users -> ["reviews", "users"]
 */
function parseAsArray(s: string): string[] {
  return s
    .trim()
    .replace(/^\[|\]$/g, "") // remove outer [ and ]
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}
