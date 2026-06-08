import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ConfigService } from '@nestjs/config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Review } from '../reviews/entities/review.entity';
import { Category } from './entities/category.entity';
import { Product } from './entities/product.entity';

describe('ProductsController', () => {
  let controller: ProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        ProductsService,
        ConfigService,
        { provide: getRepositoryToken(Product), useValue: {} },
        { provide: getRepositoryToken(Review), useValue: {} },
        { provide: getRepositoryToken(Category), useValue: {} },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
