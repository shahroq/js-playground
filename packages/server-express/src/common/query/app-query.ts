import type { NormQuery, QueryPolicy } from "./types";
import { config, defaultQueryPolicy } from "@/common/container";
import type { CollectionName } from "@/common/types";
import type {
  Expansion,
  Pagination,
  Filter,
  OrderBy,
  Selection,
} from "./types";
import type { QueryDto } from "./dto";

const RESERVED_KEYS = [
  "page",
  "per_page",
  "sort",
  "direction",
  "fields",
  "include",
];

/**
 * App Query: Works with queries, specifically for normalizing based on app-defined standards
 * Normalize and validate raw query parameters coming from an HTTP request into a consistent `INormQuery`.
 * why not just normalize query? some queries needs to be added at later stage (service, rep)/ so it needs to have append() method/ maybe those needs first should be addressed before refactoring this.
 */
export class AppQuery {
  private _normQuery: NormQuery;

  constructor(
    private query: QueryDto,
    private readonly queryPolicy?: QueryPolicy
  ) {
    this.queryPolicy = this.queryPolicy ?? defaultQueryPolicy;
  }

  get normQuery(): NormQuery {
    this.normalize();
    return this._normQuery;
  }

  append(query: QueryDto) {
    this.query = {
      ...this.query,
      ...query,
    };

    return this;
  }

  private normalize() {
    this._normQuery = {
      pagination: this.normalizePagination(),
      orderBy: this.normalizeOrderBy(),
      selection: this.normalizeSelection(),
      expansion: this.normalizeExpansion(),
      filter: this.normalizeFilters(),
    };

    return this;
  }

  private normalizePagination(): Pagination {
    const { defaultLimit } = this.queryPolicy ?? {};

    const page = +(this.query.page ?? 1);
    const per_page = +(
      this.query.per_page ??
      defaultLimit ??
      config.default.pagination_limit
    );
    const offset = (page - 1) * per_page;

    return { page, per_page, offset };
  }

  private normalizeOrderBy(): OrderBy | undefined {
    let { sort, direction } = this.query;
    const { defaultOrderBy, sortableFields } = this.queryPolicy ?? {};

    if (!sort) return this.queryPolicy?.defaultOrderBy || undefined;

    sort = sort ?? undefined;
    direction = direction === "desc" ? "desc" : "asc";

    // reject invalid sort fields
    if (!sortableFields || !sortableFields.includes(sort))
      return defaultOrderBy;

    return sort !== undefined ? { sort, direction } : undefined;
  }

  private normalizeSelection(): Selection | undefined {
    const { fields } = this.query;
    const { selectableFields } = this.queryPolicy ?? {};

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
    const { expandableCollections } = this.queryPolicy ?? {};

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
    const { filterableFields } = this.queryPolicy ?? {};

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
