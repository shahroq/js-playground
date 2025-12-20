import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products.entity';
import { Review } from '../reviews/reviews.entity';
import { Category } from '../categories/categories.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Review, Category])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
