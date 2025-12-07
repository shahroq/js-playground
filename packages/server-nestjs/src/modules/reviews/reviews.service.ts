import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateReviewDto } from "./dto/create-review.dto";
import { UpdateReviewDto } from "./dto/update-review.dto";
import { Review } from "./entities/review.entity";
import { formatISO } from "./../../common/utils/utils";
import dataSource from "../../../data/data-source.json";

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly repository: Repository<Review>,
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
