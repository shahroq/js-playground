import config from "@/common/config/config";
import type { IRawQuery, INormalizedQuery } from "@/common/type/type";

export class QueryHelper {
  static normalize<T extends IRawQuery>(query: T): INormalizedQuery {
    const page = Math.max(Number(query.page) || 1, 1);
    const limit = Number(query.limit ?? config.pagination_limit);
    const offset = (page - 1) * limit;

    return { ...query, page, limit, offset };
  }
  /*
  static meta(params: INormalizedQuery, total: number) {
    const { page, limit } = params;

    return {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasNextPage: page * limit < total,
      hasPrevPage: page > 1,
    };
  }
  */
}
