import { BaseRepository } from "@/common/base-repository";
import type { Review } from "./type";

export class ReviewRepository extends BaseRepository<Review> {
  constructor() {
    super("reviews");
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
