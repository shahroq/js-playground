import type { EntityId } from "@/common/types";
import type { IReview, ReviewStatus } from "./types";
import { BaseRepository } from "@/common/repository/base.repository";
import type { IDbClientService } from "@/common/db-client/db-client-service.interface";
import type { QueryObject } from "@/common/query-object/types";

export class ReviewRepository extends BaseRepository<IReview> {
  constructor(dbAdapter: IDbClientService) {
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
    return this.dbClientService.avg<IReview>(
      this.collection,
      queryObject,
      "rating"
    );
  }

  async updateStatus(
    id: EntityId,
    status: ReviewStatus
  ): Promise<IReview | null> {
    return await this.dbClientService.update<IReview>(this.collection, id, {
      status,
    });
  }

  // async findAllByRating(minRating: number): Promise<Review[]> {}
}
