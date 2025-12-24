import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { formatISO } from './../../common/utils/utils';
import { ConfigService } from '@nestjs/config';
import { Review } from '../reviews/entities/review.entity';
import { Category } from './entities/category.entity';

@Injectable()
export class ProductsService {
  private userId: number;

  constructor(
    private readonly config: ConfigService,
    @InjectRepository(Product)
    private readonly repository: Repository<Product>,
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {
    this.userId = this.config.get<number>('default.user_id') ?? 1;
  }

  async findAll() {
    const items = await this.repository.find({
      relations: ['reviews', 'categories'],
    });
    return items;
  }

  async findOne(id: number) {
    const item = await this.repository.findOne({
      where: { id },
      relations: ['reviews', 'categories'],
    });
    if (!item) throw new NotFoundException(`Item ${id} not found.`);

    return item;
  }

  async create(createProductDto: CreateProductDto) {
    const categories = await Promise.all(
      createProductDto.categories.map((name) =>
        this.preloadCategoryByName(name),
      ),
    );

    const creatingItem = {
      ...createProductDto,
      categories,
      created_at: formatISO(),
      updated_at: formatISO(),
      created_by: this.userId,
      updated_by: this.userId,
    };

    const item = this.repository.create(creatingItem);
    const createdItem = await this.repository.save(item);
    return createdItem;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const categories =
      updateProductDto.categories &&
      (await Promise.all(
        updateProductDto.categories.map((name: string) =>
          this.preloadCategoryByName(name),
        ),
      ));

    // use .preload():
    const updatingItem = await this.repository.preload({
      id,
      ...updateProductDto,
      categories,
      updated_at: formatISO(),
      updated_by: this.userId,
    });
    if (!updatingItem) throw new NotFoundException(`Item ${id} not found.`);

    const updatedItem = await this.repository.save(updatingItem);
    return updatedItem;
  }

  async remove(id: number) {
    const deletingItem = await this.findOne(id);
    // no error handling, as findOne does it
    const deletedItem = await this.repository.remove(deletingItem);
    return deletedItem;
  }

  private async preloadCategoryByName(name: string): Promise<Category> {
    const existingCategory = await this.categoryRepository.findOne({
      where: { name },
    });
    if (existingCategory) return existingCategory;

    return this.categoryRepository.create({ name });
  }
}
