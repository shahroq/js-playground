import type { EntityId } from "@/common/types";
import type { IReviewResult, Review } from "./types";
import { BaseRepository } from "@/common/repository/base.repository";
import type { INormQuery } from "@/common/query-object/types";
import type { IDBAdapter } from "@/common/db-adapter/db-adapter.interface";
import { reviewsQueryOptions as queryOptions } from "@/common/container";

export class ReviewRepository extends BaseRepository<Review> {
  constructor(dbAdapter: IDBAdapter) {
    super("reviews", queryOptions, dbAdapter);
  }

  // used by service of product module
  async findByProductId(productId: EntityId): Promise<IReviewResult> {
    const items = await this.findAll({
      filter: {
        product_id: productId,
      },
      orderBy: {
        sort: "created_at",
        direction: "desc",
      },
    });
    const total_count = await this.count({
      filter: { product_id: productId },
    });
    const average_rating = await this.average({
      filter: { product_id: productId },
    });

    return { items, total_count, average_rating };
  }

  // async findByUserId(userId: EntityId): Promise<Review[]> {}

  async average(normQuery: INormQuery): Promise<number | null> {
    return this.dbAdapter.avg<Review>(this.collection, normQuery, "rating");
  }

  // async findByRating(minRating: number): Promise<Review[]> {}
}
