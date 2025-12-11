import type { INormQuery, QueryOptions } from "./types";
import { config } from "@/common/container";

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

/**
 * Query: Works with queriee, specifically for normalizing based on app-defined standards
 * Normalize and validate raw query parameters coming from an HTTP request
 * into a consistent `INormQuery`.
 * TODO: use passed DTO
 */
export class Query {
  private _normalized: any;

  constructor(
    private query: any,
    private readonly queryOptions: QueryOptions,
    private readonly dto?: any
  ) {}

  get normalized() {
    this.normalize();
    return this._normalized;
  }

  append(query: any) {
    this.query = {
      ...this.query,
      ...query,
    };

    return this;
  }

  private normalize() {
    this._normalized = {
      pagination: this.normalizePagination(),
      orderBy: this.normalizeOrderBy(),
      filter: this.normalizeFilters(),
      selection: this.normalizeSelection(),
      expansion: this.normalizeExpansion(),
    };

    return this;
  }

  private normalizePagination(): Pagination {
    const { defaultLimit } = this.queryOptions ?? {};

    const page = +this.query.page || 1;
    const per_page =
      +this.query.per_page || defaultLimit || config.global_pagination_limit;
    const offset = (page - 1) * per_page;

    return { page, per_page, offset };
  }

  private normalizeOrderBy(): OrderBy | undefined {
    let { sort, direction } = this.query;
    const { defaultOrderBy, sortableFields } = this.queryOptions ?? {};

    if (!sort) return this.queryOptions?.defaultOrderBy || undefined;

    sort = sort ?? undefined;
    direction = direction === "desc" ? "desc" : "asc";

    // reject invalid sort fields
    if (!sortableFields || !sortableFields.includes(sort))
      return defaultOrderBy;

    return sort !== undefined ? { sort, direction } : undefined;
  }

  private normalizeSelection(): Selection | undefined {
    const { fields } = this.query;
    const { selectableFields } = this.queryOptions ?? {};

    // if (!fields) return { fields: selectableFields };
    if (!fields) return undefined;

    // Convert include to array of strings
    const fieldsAr = this.parseAsArray(`${fields}`);

    // Filter only allowed collections and assert type
    const fieldsRefined = fieldsAr.filter(
      (f) => selectableFields?.includes(f) ?? false
    );

    return fieldsRefined.length > 0 ? { fields: fieldsRefined } : undefined;
  }

  private normalizeExpansion(): Expansion | undefined {
    const { include } = this.query;
    const { expandableCollections } = this.queryOptions ?? {};

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

  private normalizeFilters(): Filter | undefined {
    const { filterableFields } = this.queryOptions ?? {};

    const filter: Filter = {};

    if (!filterableFields || filterableFields.length === 0) return undefined;

    for (const [key, value] of Object.entries(this.query)) {
      // skip reserved keys
      if (RESERVED_KEYS.includes(key)) continue;

      // only accept fields explicitly allowed
      if (!filterableFields.includes(key)) continue;

      // ignore undefined/null
      if (value === undefined || value === null) continue;

      filter[key] = this.coerce(value);
    }

    return Object.keys(filter).length > 0 ? filter : undefined;
  }

  /**
   * Correct types
   */
  private coerce(v: any) {
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
  private parseAsArray(s: string): string[] {
    return s
      .trim()
      .replace(/^\[|\]$/g, "") // remove outer [ and ]
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }
}
