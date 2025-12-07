import { config } from "@/common/container.ts";
import type { CollectionName } from "@/common/types";
import type { RepoOptions } from "@/common/repository/base.repository";
import type {
  IRawQuery,
  INormQuery,
  Pagination,
  OrderBy,
  Filter,
  Selection,
  Expansion,
} from "./types";

const reserved = new Set([
  "page",
  "per_page",
  "sort",
  "direction",
  "fields",
  "include",
]);

/**
 * Query: Utility class for working with queries
 *
 * Normalize and validate raw query parameters coming from an HTTP request
 * into a consistent `INormQuery` shape used by repositories.
 * Not a stateless class.
 */
export class Query {
  private constructor() {}

  static normalize(rawQuery: IRawQuery, repoOptions: RepoOptions): INormQuery {
    const raw = rawQuery;
    const opts = repoOptions;

    return {
      pagination: this.pagination(raw, opts),
      orderBy: this.orderBy(raw, opts),
      filter: this.filter(raw, opts),
      selection: this.selection(raw, opts),
      expansion: this.expansion(raw, opts),
    };
  }

  private static pagination(raw: IRawQuery, opts: RepoOptions): Pagination {
    let { page, per_page } = raw;
    const { defaultPerPage } = opts;
    const { pagination_per_page } = config;

    page = Math.max(Number(page) || 1, 1);
    per_page = +(per_page ?? defaultPerPage ?? pagination_per_page);
    const offset = (page - 1) * per_page;

    return { page, per_page, offset };
  }

  private static orderBy(
    raw: IRawQuery,
    opts: RepoOptions
  ): OrderBy | undefined {
    let { sort, direction } = raw;
    const { defaultOrder, allowedSortFields } = opts;

    if (!sort) return defaultOrder;

    sort = sort ?? undefined;
    direction = direction === "desc" ? "desc" : "asc";

    // reject invalid sort fields
    if (!allowedSortFields || !allowedSortFields.includes(sort))
      return defaultOrder;

    return sort !== undefined ? { sort, direction } : undefined;
  }

  private static filter(raw: IRawQuery, opts: RepoOptions): Filter | undefined {
    ``;
    const rawQuery = raw;
    const { filterableFields } = opts;

    const filter: Filter = {};

    if (!filterableFields || filterableFields.length === 0) return undefined;

    for (const [key, value] of Object.entries(rawQuery)) {
      // skip reserved keys
      if (reserved.has(key)) continue;

      // only accept fields explicitly allowed
      if (!filterableFields.includes(key)) continue;

      // ignore undefined/null
      if (value === undefined || value === null) continue;

      filter[key] = this.coerce(value);
    }

    return Object.keys(filter).length > 0 ? filter : undefined;
  }

  private static selection(
    raw: IRawQuery,
    opts: RepoOptions
  ): Selection | undefined {
    const { fields } = raw;
    const { selectableFields } = opts;

    if (!fields) return { fields: selectableFields };

    // Convert include to array of strings
    const fieldsAr = this.parseAsArray(`${fields}`);

    // Filter only allowed collections and assert type
    const fieldsRefined = fieldsAr.filter(
      (f) => selectableFields?.includes(f) ?? false
    );

    return fieldsRefined.length > 0 ? { fields: fieldsRefined } : undefined;
  }

  private static expansion(
    raw: IRawQuery,
    opts: RepoOptions
  ): Expansion | undefined {
    const { include } = raw;
    const { expandableCollections } = opts;

    if (!include) return undefined;

    // Convert include to array of strings
    const includeAr = this.parseAsArray(`${include}`);

    // Filter only allowed collections and assert type
    const includeRefined: CollectionName[] = includeAr.filter(
      (c): c is CollectionName =>
        expandableCollections?.includes(c as CollectionName) ?? false
    );

    return includeRefined.length > 0 ? { include: includeRefined } : undefined;
  }

  /**
   * Correct types
   */
  private static coerce(v: any) {
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
  private static parseAsArray(s: string): string[] {
    return s
      .trim()
      .replace(/^\[|\]$/g, "") // remove outer [ and ]
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }
}
