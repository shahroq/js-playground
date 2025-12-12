import type { EntityId } from "@/common/types";
import type { IReviewResult, Review } from "./types";
import { BaseRepository } from "@/common/repository/base.repository";
import type { IDBAdapter } from "@/common/db-adapter/db-adapter.interface";
import {
  AppQuery,
  reviewsQueryOptions as queryOptions,
} from "@/common/container";

export class ReviewRepository extends BaseRepository<Review> {
  constructor(dbAdapter: IDBAdapter) {
    super("reviews", queryOptions, dbAdapter);
  }

  // used by service of product module
  // TODO: should it be here? or at service layer
  async findAllByProductId(productId: EntityId): Promise<IReviewResult> {
    const appQuery = new AppQuery(
      {
        product_id: productId,
        sort: "created_at",
        direction: "desc",
      },
      queryOptions
    );

    const items = await this.findAll(appQuery);

    const total_count = await this.count(appQuery);
    const average_rating = await this.average(appQuery);

    return { items, total_count, average_rating };
  }

  // async findAllByUserId(userId: EntityId): Promise<Review[]> {}

  async average(appQuery: AppQuery): Promise<number | null> {
    return this.dbAdapter.avg<Review>(this.collection, appQuery, "rating");
  }

  // async findAllByRating(minRating: number): Promise<Review[]> {}
}
