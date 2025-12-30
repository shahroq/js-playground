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
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AppQuery } from 'src/common/query-service/app-query.service';
import { queryPolicy } from './query.policy';
import { QueryDto } from 'src/common/query-service/query.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly service: ProductsService) {}

  @Get()
  async findAll(@Query() query: QueryDto) {
    const appQuery = new AppQuery(query, queryPolicy);
    const products = await this.service.findAll(appQuery);
    return { products };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const product = await this.service.findOne(id);
    return { product };
  }

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.service.create(createProductDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.service.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(+id);
  }
}
