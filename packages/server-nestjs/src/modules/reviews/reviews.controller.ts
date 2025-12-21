import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto, UpdateReviewDto } from './reviews.dto';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly service: ReviewsService) {}

  @Post()
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.service.create(createReviewDto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.service.update(+id, updateReviewDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }

  @Patch(':id/reject')
  reject(@Param('id') id: string) {
    return this.service.reject(+id);
  }

  @Patch(':id/approve')
  approve(@Param('id') id: string) {
    return this.service.approve(+id);
  }
}
