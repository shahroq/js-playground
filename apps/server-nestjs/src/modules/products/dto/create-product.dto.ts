import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { Optional } from '@nestjs/common';

export class CreateProductDto {
  @IsString()
  readonly name: string;

  @IsString()
  @Optional()
  readonly description: string;

  @IsNumber()
  readonly price: number;

  @IsString({ each: true })
  @Optional()
  readonly categories: string[];

  @IsBoolean()
  readonly in_stock: boolean;
}
