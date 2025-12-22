import { Test, TestingModule } from '@nestjs/testing';
import { ReviewsService } from './reviews.service';
import { ConfigService } from '@nestjs/config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Review } from './reviews.entity';
import { Product } from '../products/entities/product.entity';

describe('ReviewsService', () => {
  let service: ReviewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewsService,
        ConfigService,
        { provide: getRepositoryToken(Review), useValue: {} },
        { provide: getRepositoryToken(Product), useValue: {} },
      ],
    }).compile();

    service = module.get<ReviewsService>(ReviewsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
