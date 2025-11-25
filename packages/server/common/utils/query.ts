import config from "@/common/config/config";
import type {
  CollectionName,
  IRawQuery,
  INormQuery,
  Pagination,
  OrderBy,
  Filter,
  Expansion,
} from "@/common/type/type";
import type { RepoOptions } from "@/common/repository/base-repository";

const reserved = new Set(["page", "per_page", "sort", "direction", "include"]);

export class Query {
  constructor(
    private readonly rawQuery: IRawQuery,
    private readonly repoOptions: RepoOptions
  ) {}

  getNormalized(): INormQuery {
    return {
      pagination: this.pagination(),
      orderBy: this.orderBy(),
      filter: this.filter(),
      expansion: this.expansion(),
    };
  }

  private pagination(): Pagination {
    let { page, per_page } = this.rawQuery;
    const { defaultPerPage } = this.repoOptions;
    const { pagination_per_page } = config;

    page = Math.max(Number(page) || 1, 1);
    per_page = +(per_page ?? defaultPerPage ?? pagination_per_page);
    const offset = (page - 1) * per_page;

    return { page, per_page, offset };
  }

  private orderBy(): OrderBy | undefined {
    let { sort, direction } = this.rawQuery;
    const { defaultOrder, allowedSortFields } = this.repoOptions;

    if (!sort) return defaultOrder;

    sort = sort ?? undefined;
    direction = direction === "desc" ? "desc" : "asc";

    // reject invalid sort fields
    if (!allowedSortFields || !allowedSortFields.includes(sort))
      return defaultOrder;

    return sort !== undefined ? { sort, direction } : undefined;
  }

  private filter(): Filter | undefined {
    const rawQuery = this.rawQuery;
    const { filterableFields } = this.repoOptions;

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

  private expansion(): Expansion | undefined {
    const { include } = this.rawQuery;
    const { expandableCollections } = this.repoOptions;

    if (!include) return undefined;

    // Convert include to array of strings
    const includeArray = this.parseAsArray(`${include}`);

    // Filter only allowed collections and assert type
    const collections: CollectionName[] = includeArray.filter(
      (c): c is CollectionName =>
        expandableCollections?.includes(c as CollectionName) ?? false
    );

    return collections.length > 0 ? { include: collections } : undefined;
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
