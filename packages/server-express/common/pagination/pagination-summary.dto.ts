import { config, type AppQuery } from "@/common/container";

export class PaginationSummaryDto {
  private constructor(
    public readonly page: number,
    public readonly per_page: number,
    public readonly total_pages: number,
    public readonly total_count: number,
    public readonly has_next_page: boolean,
    public readonly has_prev_page: boolean
  ) {}

  static from(appQuery: AppQuery, total: number): PaginationSummaryDto {
    const normQuery = appQuery.normQuery;

    const page = normQuery?.pagination?.page || 1;
    const per_page =
      normQuery?.pagination?.per_page || config.default.pagination_limit;
    const total_pages = Math.ceil(total / per_page);
    const total_count = total;
    const has_next_page = page * per_page < total;
    const has_prev_page = page > 1;

    return new PaginationSummaryDto(
      page,
      per_page,
      total_pages,
      total_count,
      has_next_page,
      has_prev_page
    );
  }
}
