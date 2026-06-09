import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import dbSource from 'data/data-source.json';
import { Review } from 'src/modules/reviews/entities/review.entity';

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
    @InjectRepository(Review) private reviewRepo: Repository<Review>,
  ) {}

  async run() {
    console.log('Stage 2: Running seeder...');
    // await this.seedReviews();
    console.log('Data seeder completed.');
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
