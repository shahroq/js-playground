import { Module } from '@nestjs/common';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './reviews.entity';
import { Product } from '../products/products.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Review, Product])],
  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule {}
