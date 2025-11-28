import type { EntityId, IRawQuery } from "@/common/type";
import type { IReviewResult, Review } from "./type";
import { BaseRepository } from "@/common/repository/base.repository";

export class ReviewRepository extends BaseRepository<Review> {
  constructor() {
    super("reviews", {
      // defaultPerPage: 10,
      selectableFields: ["id", "content", "rating", "product_id"],
      defaultOrder: { sort: "id", direction: "asc" },
      allowedSortFields: ["id", "title", "created_at"],
      searchableFields: [],
      filterableFields: ["id", "product_id"],
      expandableCollections: ["products"],
    });
  }

  async findByProductId(productId: EntityId): Promise<IReviewResult> {
    const reviews = await this.find({
      product_id: productId,
      sort: "created_at",
      direction: "desc",
    });
    const review_count = await this.count({ product_id: productId });
    const average_rating = await this.average({ product_id: productId });

    return { reviews, review_count, average_rating };
  }

  async findByUserId(userId: EntityId): Promise<Review[]> {
    return this.find({
      user_id: userId,
      sort: "created_at",
      direction: "desc",
    });
  }

  async average(rawQuery: IRawQuery): Promise<number | null> {
    const normQuery = this.normalizeQuery(rawQuery);
    return this.dbAdapter.avg<Review>(this.collection, normQuery, "rating");
  }

  /*
  async findByRating(minRating: number): Promise<Review[]> {
    // ..
  }
  */
}
