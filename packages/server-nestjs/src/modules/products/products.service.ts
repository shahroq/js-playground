import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto, UpdateProductDto } from './products.dto';
import { Product } from './products.entity';
import { formatISO } from './../../common/utils/utils';
import { ConfigService } from '@nestjs/config';
import { Review } from '../reviews/reviews.entity';

@Injectable()
export class ProductsService {
  private userId: number;

  constructor(
    private readonly config: ConfigService,
    @InjectRepository(Product)
    private readonly repository: Repository<Product>,
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
  ) {
    this.userId = this.config.get<number>('default.user_id') ?? 1;
  }

  async findAll() {
    const items = await this.repository.find({
      relations: ['reviews'],
    });
    return items;
  }

  async findOne(id: number) {
    // const item = await this.repository.findOneBy({ id });
    const item = await this.repository.findOne({
      where: { id },
      relations: ['reviews'],
    });
    if (!item)
      throw new HttpException(`Item ${id} not found.`, HttpStatus.NOT_FOUND);
    return item;
  }

  async create(createProductDto: CreateProductDto) {
    const creatingItem = {
      ...createProductDto,
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
    /*
    const exisitingItem = await this.findOne(id);
    // no error handling, as findOne does it

    const updatingItem = {
      ...exisitingItem,
      ...updateProductDto,
      updated_at: formatISO(),
      updated_by: this.userId,
    };
    */

    // use .preload():
    const updatingItem = await this.repository.preload({
      id,
      ...updateProductDto,
      updated_at: formatISO(),
      updated_by: this.userId,
    });

    if (!updatingItem)
      throw new HttpException(`Item ${id} not found.`, HttpStatus.NOT_FOUND);

    const updatedItem = await this.repository.save(updatingItem);
    return updatedItem;
  }

  async remove(id: number) {
    const deletingItem = await this.findOne(id);
    // no error handling, as findOne does it
    const deletedItem = await this.repository.remove(deletingItem);
    return deletedItem;
  }
}
