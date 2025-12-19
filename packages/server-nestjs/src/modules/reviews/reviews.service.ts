import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReviewDto, UpdateReviewDto } from './reviews.dto';
import { Review } from './reviews.entity';
import { formatISO } from './../../common/utils/utils';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ReviewsService {
  private userId: number;

  constructor(
    @InjectRepository(Review)
    private readonly repository: Repository<Review>,
    private readonly config: ConfigService,
  ) {
    this.userId = this.config.get<number>('default.user_id') ?? 1;
  }

  async findAll() {
    const items = await this.repository.find();
    return items;
  }

  async findOne(id: number) {
    const item = await this.repository.findOneBy({ id });
    if (!item)
      throw new HttpException(`Item ${id} not found.`, HttpStatus.NOT_FOUND);
    return item;
  }

  async create(createReviewDto: CreateReviewDto) {
    const creatingItem = {
      ...createReviewDto,
      created_at: formatISO(),
      updated_at: formatISO(),
      created_by: this.userId,
      updated_by: this.userId,
    };
    const item = this.repository.create(creatingItem);
    const createdItem = await this.repository.save(item);
    return createdItem;
  }

  async update(id: number, updateReviewDto: UpdateReviewDto) {
    /*
    const exisitingItem = await this.findOne(id);
    // no error handling, as findOne does it

    const updatingItem = {
      ...exisitingItem,
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
