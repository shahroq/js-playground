import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from './entities/review.entity';
import { formatISO } from './../../common/utils/utils';
import dataSource from '../../../data/data-source.json';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly repository: Repository<Review>,
  ) {}
  private reviews: Review[] = dataSource.reviews as Review[];

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
      created_by: 3,
      updated_by: 3,
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
      updated_by: 3,
    };

    const updatedItem = await this.repository.save(updatingItem);
    */

    // use preload:
    const updatedItem = await this.repository.preload({
      id,
      ...updateReviewDto,
      updated_at: formatISO(),
      updated_by: 3,
    });

    if (!updatedItem)
      throw new HttpException(`Item ${id} not found.`, HttpStatus.NOT_FOUND);

    return updatedItem;
  }

  async remove(id: number) {
    const deletingItem = await this.findOne(id);
    // no error handling, as findOne does it
    const deletedItem = await this.repository.remove(deletingItem);
    return deletedItem;
  }
}
