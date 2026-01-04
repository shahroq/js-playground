import type { EntityId } from "@/common/types";
import type { IReview, ReviewStatus } from "./types";
import { BaseRepository } from "@/common/repository/base.repository";
import type { IDbClient } from "@/common/db-client/db-client.interface";
import type { QueryObject } from "@/common/query-object/types";

export class ReviewRepository extends BaseRepository<IReview> {
  constructor(dbAdapter: IDbClient) {
    super("reviews", dbAdapter);
  }

  // used by service of product module
  async findAllByProductId(productId: EntityId) {
    const queryObject: QueryObject = {
      filter: {
        product_id: productId,
      },
      sort: [{ field: "created_at", direction: "desc" }],
    };
    const items = await this.findAll(queryObject);

    const review_count = await this.count(queryObject);
    const average_rating = await this.average(queryObject);

    return { reviews: items, review_count, average_rating };
  }

  // async findAllByUserId(userId: EntityId): Promise<Review[]> {}

  async average(queryObject: QueryObject): Promise<number | null> {
    return this.dbAdapter.avg<IReview>(this.collection, queryObject, "rating");
  }

  async updateStatus(
    id: EntityId,
    status: ReviewStatus
  ): Promise<IReview | null> {
    return await this.dbAdapter.update<IReview>(this.collection, id, {
      status,
    });
  }

  // async findAllByRating(minRating: number): Promise<Review[]> {}
}
