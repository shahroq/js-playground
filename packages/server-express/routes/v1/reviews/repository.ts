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

  async findByProductId(productId: EntityId): Promise<IReviewResult> {
    const reviews = await this.findAll({
      product_id: productId,
      sort: "created_at",
      direction: "desc",
    });
    const review_count = await this.count({ product_id: productId });
    const average_rating = await this.average({ product_id: productId });

    return { reviews, review_count, average_rating };
  }

  async findByUserId(userId: EntityId): Promise<Review[]> {
    return this.findAll({
      user_id: userId,
      sort: "created_at",
      direction: "desc",
    });
  }

  async average(normQuery: INormQuery): Promise<number | null> {
    return this.dbAdapter.avg<Review>(this.collection, normQuery, "rating");
  }

  /*
  async findByRating(minRating: number): Promise<Review[]> {
    // ..
  }
  */
}
