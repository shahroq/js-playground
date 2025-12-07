import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Review } from "src/catalog/review.entity";
import { Repository } from "typeorm";
import dbSource from "./../../../data/data-source.json";

const reviewData = dbSource.reviews.map((i) => ({
  product_id: Number(i.product_id),
  content: i.content,
  rating: i.rating,
  created_by: i.created_by,
  updated_by: i.updated_by,
}));

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Review) private reviewRepo: Repository<Review>
  ) {}

  async run() {
    console.log("Stage 2: Running seeder...");
    // await this.seedReviews();
    console.log("Data seeder completed.");
  }

  private async seedReviews() {
    /*
    for (const reviewData of item) {
      console.log(item);
      await this.reviewRepo.save(item);
    }
      */
  }
}
