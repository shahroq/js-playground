import { IsNumber, IsString, Max, Min } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateReviewDto {
  @IsNumber()
  readonly product_id: number;

  @IsString()
  readonly content: string;

  @IsNumber()
  @Min(1)
  @Max(5)
  readonly rating: number;
}

export class UpdateReviewDto extends PartialType(CreateReviewDto) {}
