import type { IMeta } from "@/common/types";
import type { AppQuery } from "@/common/container";

// TODO: asbtract? relate to Query maybe? or app-response? total in here?
// rename to AppResponseMetaData?

export class MetaData {
  constructor(
    private readonly appQuery: AppQuery,
    private readonly total: number
  ) {}

  build(): IMeta {
    const normQuery = this.appQuery.normQuery;

    const {
      pagination: { page, per_page },
    } = normQuery;

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
