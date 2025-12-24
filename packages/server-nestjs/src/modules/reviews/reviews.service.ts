import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from './entities/review.entity';
import { formatISO } from './../../common/utils/utils';
import { ConfigService } from '@nestjs/config';
import { Product } from '../products/entities/product.entity';
import { ReviewStatus } from './reviews.types';
import { PaginationQueryDto } from 'src/common/query/query.dto';

@Injectable()
export class ReviewsService {
  private userId: number;

  constructor(
    private readonly config: ConfigService,
    @InjectRepository(Review)
    private readonly repository: Repository<Review>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {
    this.userId = this.config.get<number>('default.user_id') ?? 1;
  }

  async findAll(paginationQueryDto: PaginationQueryDto) {
    const page = +(paginationQueryDto.page ?? 1);
    const per_page = +(paginationQueryDto.per_page ?? 3);
    const offset = (page - 1) * per_page;
    // console.log('Pagination:', page, per_page, offset);

    const items = await this.repository.find({
      take: per_page,
      skip: offset,
      relations: ['product'],
    });
    return items;
  }

  async findOne(id: number) {
    const item = await this.repository.findOne({
      where: { id },
      relations: ['product'],
    });
    if (!item) throw new NotFoundException(`Item ${id} not found.`);

    return item;
  }

  async create(createReviewDto: CreateReviewDto) {
    const { product_id } = createReviewDto;
    const product = await this.productRepository.findOneBy({ id: product_id });
    if (!product)
      throw new NotFoundException(`Product ${product_id} not found.`);

    const creatingItem = {
      ...createReviewDto,
      status: ReviewStatus.PENDING,
      created_at: formatISO(),
      updated_at: formatISO(),
      created_by: this.userId,
      updated_by: this.userId,
      product,
    };

    const item = this.repository.create(creatingItem);
    const createdItem = await this.repository.save(item);
    return createdItem;
  }

  async update(id: number, updateReviewDto: UpdateReviewDto) {
    /*
    const updatingItem = await this.findOne(id);
    // no error handling, as findOne does it

    const updatingItem = {
      ...updatingItem,
      ...updateReviewDto,
      updated_at: formatISO(),
      updated_by: this.userId,
    };
    */

    // use .preload():
    const updatingItem = await this.repository.preload({
      id,
      ...updateReviewDto,
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

  async reject(id: number) {
    const updatingItem = await this.repository.findOneBy({ id });
    if (!updatingItem) throw new NotFoundException(`Item ${id} not found.`);
    if (updatingItem.status !== ReviewStatus.PENDING)
      throw new BadRequestException('Only PENDING reviews can be REJECTED');

    Object.assign(updatingItem, {
      status: ReviewStatus.REJECTED,
      updated_at: formatISO(),
      updated_by: this.userId,
    });

    const updatedItem = await this.repository.save(updatingItem);
    if (!updatedItem) throw new NotFoundException(`Item ${id} not found.`);

    return updatedItem;
  }

  async approve(id: number) {
    const updatingItem = await this.repository.findOneBy({ id });
    if (!updatingItem) throw new NotFoundException(`Item ${id} not found.`);
    if (updatingItem.status !== ReviewStatus.PENDING)
      throw new BadRequestException('Only PENDING reviews can be APPROVED');

    Object.assign(updatingItem, {
      status: ReviewStatus.APPROVED,
      updated_at: formatISO(),
      updated_by: this.userId,
    });

    const updatedItem = await this.repository.save(updatingItem);
    if (!updatedItem) throw new NotFoundException(`Item ${id} not found.`);

    return updatedItem;
  }
}
