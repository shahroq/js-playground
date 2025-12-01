import type { IMeta } from "@/common/types";
import type { INormQuery } from "@/common/query-object/types";

export class MetaData {
  private constructor() {}

  static build(normQuery: INormQuery, total: number): IMeta {
    const {
      pagination: { page, per_page },
    } = normQuery;

    return {
      page,
      per_page,
      total_pages: Math.ceil(total / per_page),
      total_count: total,
      has_next_page: page * per_page < total,
      has_prev_page: page > 1,
    };
  }
}
