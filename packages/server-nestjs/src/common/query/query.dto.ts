import { IsIn, IsOptional, IsPositive, IsString } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  @IsPositive()
  page: number = 1;

  @IsOptional()
  @IsPositive()
  per_page: number = 3;

  @IsOptional()
  @IsPositive()
  offset: number;
}

export class OrderByQueryDto {
  @IsOptional()
  @IsString()
  sort: string = 'created_at';

  @IsOptional()
  @IsString()
  @IsIn(['asc', 'desc'])
  direction: 'asc' | 'desc' = 'asc';
}

export class FilterQueryDto {
  filters: Record<string, any>;
}

export class SelectionQueryDto {
  fields?: string[];
}

export class ExpansionQueryDto {
  include?: string[]; // replace `string` with CollectionName if needed
}

// --- Normalized Query DTO For List End Points ---
export class NormQueryDtoList {
  pagination?: PaginationQueryDto;
  orderBy?: OrderByQueryDto;
  filters?: FilterQueryDto;
  selection?: SelectionQueryDto;
  expansion?: ExpansionQueryDto;
}

// --- Normalized Query DTO For Show End Points ---
export class NormQueryDtoShow {
  selection?: SelectionQueryDto;
  expansion?: ExpansionQueryDto;
}
