import type { IMeta } from "@/common/type";
import type { INormQuery } from "../query-object/type";

export class MetaData {
  constructor(
    private readonly normQuery: INormQuery,
    private readonly total: number
  ) {}

  build(): IMeta {
    const {
      pagination: { page, per_page },
    } = this.normQuery;

    return {
      page,
      per_page,
      total_pages: Math.ceil(this.total / per_page),
      total_count: this.total,
      has_next_page: page * per_page < this.total,
      has_prev_page: page > 1,
    };
  }
}
