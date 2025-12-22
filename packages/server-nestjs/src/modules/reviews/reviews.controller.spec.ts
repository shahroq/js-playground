import { Test, TestingModule } from '@nestjs/testing';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
import { ConfigService } from '@nestjs/config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from '../products/entities/product.entity';
import { Review } from './reviews.entity';

describe('ReviewsController', () => {
  let controller: ReviewsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReviewsController],
      providers: [
        ReviewsService,
        ConfigService,
        { provide: getRepositoryToken(Review), useValue: {} },
        { provide: getRepositoryToken(Product), useValue: {} },
      ],
    }).compile();

    controller = module.get<ReviewsController>(ReviewsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
