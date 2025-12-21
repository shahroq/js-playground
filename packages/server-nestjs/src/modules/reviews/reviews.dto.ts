import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { ReviewStatus } from './reviews.types';

export class CreateReviewDto {
  @IsNumber()
  readonly product_id: number;

  @IsString()
  readonly content: string;

  @IsNumber()
  @Min(1)
  @Max(5)
  readonly rating: number;

  @IsEnum(ReviewStatus)
  @IsOptional()
  status: ReviewStatus;
}

export class UpdateReviewDto extends PartialType(CreateReviewDto) {}
