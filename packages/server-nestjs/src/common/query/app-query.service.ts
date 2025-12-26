import { Injectable } from '@nestjs/common';
import { QueryDto } from './query.dto';
import type { NormQuery, OrderBy, Pagination, QueryPolicy } from './types';
import { queryPolicy as defaultQueryPolicy } from './default.policy';

const RESERVED_KEYS = [
  'page',
  'per_page',
  'sort',
  'direction',
  'fields',
  'include',
];

/**
 * App Query: Works with queries, specifically for normalizing based on app-defined standards
 * Normalize and validate raw query parameters coming from an HTTP request into a consistent `INormQuery`.
 */
@Injectable()
export class AppQuery {
  private _normQuery: NormQuery;

  constructor(
    private query: QueryDto,
    private readonly queryPolicy?: QueryPolicy,
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
    };

    return this;
  }

  private normalizePagination(): Pagination {
    const { defaultLimit } = this.queryPolicy ?? {};

    const page = +(this.query.page ?? 1);
    const per_page = +(
      (this.query.per_page ?? defaultLimit ?? 10)
      // this.config.get<number>('default.pagination_limit', 10)
    );
    const offset = (page - 1) * per_page;

    return { page, per_page, offset };
  }

  private normalizeOrderBy(): OrderBy | undefined {
    let { sort, direction } = this.query;
    const { defaultOrderBy, sortableFields } = this.queryPolicy ?? {};

    if (!sort) return this.queryPolicy?.defaultOrderBy || undefined;

    sort = sort ?? undefined;
    direction = direction === 'desc' ? 'desc' : 'asc';

    // reject invalid sort fields
    if (!sortableFields || !sortableFields.includes(sort))
      return defaultOrderBy;

    return sort !== undefined ? { sort, direction } : undefined;
  }
}
