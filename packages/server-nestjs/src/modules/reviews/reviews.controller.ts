import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto, UpdateReviewDto } from './reviews.dto';
// import { Roles } from 'src/common/decorators/roles.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { AppParseIntPipe } from 'src/common/pipes/app-parse-int.pipe';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly service: ReviewsService) {}

  @Get()
  async findAll() {
    // await new Promise((resolve) => setTimeout(resolve, 5000));
    const reviews = await this.service.findAll();
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
