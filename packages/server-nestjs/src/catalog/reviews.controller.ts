import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Post,
  Query,
} from "@nestjs/common";
import { CreateReviewDto, UpdateReviewDto } from "./reviews.dto.js";
import { ReviewsService } from "./reviews.service";
import { Review } from "./review.entity.js";

@Controller("reviews")
export class ReviewsController {
  constructor(private readonly service: ReviewsService) {}

  @Get()
  index(@Query() paginationQuery): Review[] {
    const { limit, offset } = paginationQuery;

    const items = this.service.findAll();
    return items;
  }

  @Get(":id")
  show(@Param("id") id: number): any {
    return this.service.findOne(id);
  }

  @Post()
  store(@Body() createReviewDto: CreateReviewDto) {
    const newItem = this.service.create(createReviewDto);
    return newItem;
  }

  @Put(":id")
  update(@Param("id") id: number, @Body() updateReviewDto: UpdateReviewDto) {
    const updatedItem = this.service.update(id, updateReviewDto);
    return updatedItem;
  }

  @Delete(":id")
  destroy(@Param("id") id: number) {
    const itemDeleted = this.service.remove(id);
    return `Item ${itemDeleted} deleted.`;
  }
}
