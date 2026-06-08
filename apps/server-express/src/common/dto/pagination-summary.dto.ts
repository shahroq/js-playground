import { config } from "@/common/container";
import type { QueryObject } from "../query-object/types";

// response dto
export class PaginationSummaryDto {
  private constructor(
    public readonly page_number: number,
    public readonly page_size: number,
    public readonly total_pages: number,
    public readonly total_count: number,
    public readonly has_prev_page: boolean,
    public readonly has_next_page: boolean
  ) {}

  static from(queryObject: QueryObject, total: number): PaginationSummaryDto {
    const page_number = queryObject?.page?.number || 1;
    const page_size =
      queryObject?.page?.size || config.default.pagination_limit;
    const total_pages = Math.ceil(total / page_size);
    const total_count = total;
    const has_prev_page = page_number > 1;
    const has_next_page = page_number * page_size < total;

    return new PaginationSummaryDto(
      page_number,
      page_size,
      total_pages,
      total_count,
      has_prev_page,
      has_next_page
    );
  }
}
