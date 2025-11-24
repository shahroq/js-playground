import type { Review } from "./type";
import { BaseRepository } from "@/common/repository/base-repository";

export class ReviewRepository extends BaseRepository<Review> {
  constructor() {
    super("reviews", {
      // defaultPerPage: 1,
      defaultOrder: { sort: "id", direction: "asc" },
      allowedSortFields: ["id", "title", "created_at"],
      searchableFields: [],
      filterableFields: ["id", "product_id"],
    });
  }
  /*
    async findByProductId(productId: string): Promise<Review[]> {
    return this.find({
      where: { productId },
      orderBy: { field: "createdAt", direction: "desc" },
    });
  }

  async findByUserId(userId: string): Promise<Review[]> {
    return this.find({ where: { userId } });
  }

  async findByRating(minRating: number): Promise<Review[]> {
    return this.find({
      where: (review: Review) => review.rating >= minRating,
    });
  }
  */
}
