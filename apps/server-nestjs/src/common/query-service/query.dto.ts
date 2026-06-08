import { IntersectionType } from '@nestjs/mapped-types';
import { IsIn, IsOptional, IsPositive, IsString } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  @IsPositive()
  page?: number;

  @IsOptional()
  @IsPositive()
  per_page?: number;

  // offset: number; // computed
}

export class OrderByQueryDto {
  @IsOptional()
  @IsString()
  sort?: string;

  @IsOptional()
  @IsString()
  @IsIn(['asc', 'desc'])
  direction?: 'asc' | 'desc';
}

export class QueryDto extends IntersectionType(
  PaginationQueryDto,
  OrderByQueryDto,
) {}
