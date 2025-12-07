import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { formatISO } from "./../common/utils/utils";
import { Review } from "./review.entity";
import { CreateReviewDto, UpdateReviewDto } from "./reviews.dto";
import dataSource from "../../data/data-source.json";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly repository: Repository<Review>
  ) {}
  private reviews: Review[] = dataSource.reviews as Review[];

  findAll() {
    const items = this.reviews;
    return items;
  }

  findOne(id: number) {
    const review = dataSource.reviews.find((item) => item.id == id);
    if (!review)
      throw new HttpException(`Item ${id} not found.`, HttpStatus.NOT_FOUND);
    return review;
  }

  create(createReviewDto: CreateReviewDto) {
    const newItem = {
      ...createReviewDto,
      id: 100,
      created_at: formatISO(),
      updated_at: formatISO(),
      created_by: 3,
      updated_by: 3,
    };
    dataSource.reviews.push(newItem);
    return newItem;
  }

  update(id: number, updateReviewDto: UpdateReviewDto) {
    const exisitingReview = this.findOne(id);
    if (!exisitingReview) throw Error("Couldn't find the item.");

    const updatedItem = {
      ...updateReviewDto,
      id,
      updated_at: formatISO(),
      updated_by: 3,
    };

    dataSource.reviews["" + id] = updatedItem;

    return updatedItem;
  }

  remove(id: number) {
    const itemIndex = this.reviews.findIndex((item) => item.id === id);
    if (itemIndex < 0) throw Error("Couldn't find the item.");

    this.reviews.splice(itemIndex, 1);

    return `Item ${itemIndex} delted.`;
  }
}
