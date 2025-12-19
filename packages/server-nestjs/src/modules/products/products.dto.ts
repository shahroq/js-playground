import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { Optional } from '@nestjs/common';

export class CreateProductDto {
  @IsString()
  readonly name: string;

  @IsString()
  @Optional()
  readonly description: string;

  @IsNumber()
  readonly price: number;

  @IsString()
  @Optional()
  readonly categories: string;

  @IsBoolean()
  readonly in_stock: boolean;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
