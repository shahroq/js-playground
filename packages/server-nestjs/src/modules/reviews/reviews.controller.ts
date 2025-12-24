import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
// import { Roles } from 'src/common/decorators/roles.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { PaginationQueryDto } from 'src/common/query/query.dto';
import { NormalizeQueryPipe } from 'src/common/pipes/normalize-query.pipe';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly service: ReviewsService) {}

  @Get()
  async findAll(
    @Query(NormalizeQueryPipe) paginationQueryDto: PaginationQueryDto,
  ) {
    // await new Promise((resolve) => setTimeout(resolve, 5000));
    const reviews = await this.service.findAll(paginationQueryDto);
    return { reviews };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const review = await this.service.findOne(id);
    return { review };
  }

  @Roles('admin', 'moderator')
  @Post()
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.service.create(createReviewDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateReviewDto: UpdateReviewDto,
  ) {
    return this.service.update(+id, updateReviewDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }

  @Patch(':id/reject')
  reject(@Param('id', ParseIntPipe) id: number) {
    return this.service.reject(id);
  }

  @Patch(':id/approve')
  approve(@Param('id', ParseIntPipe) id: number) {
    return this.service.approve(id);
  }
}
