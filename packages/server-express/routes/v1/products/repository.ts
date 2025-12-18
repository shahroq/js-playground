import type { IDbClient } from "@/common/db-client/db-client.interface";
import type { IProduct } from "./types";
import { BaseRepository } from "@/common/repository/base.repository";
import { productsQueryOptions as queryOptions } from "@/common/container";

export class ProductRepository extends BaseRepository<IProduct> {
  constructor(dbAdapter: IDbClient) {
    super("products", queryOptions, dbAdapter);
  }

  /*
  async findAllByCategory(category: string): Promise<Product[]> {
    return this.find({ where: { category } });
  }

  async findAllInStock(): Promise<Product[]> {
    return this.find({ where: { in_stock: true } });
  }

  async findAllByPriceRange(min: number, max: number): Promise<Product[]> {
    return this.find({
      where: (product: Product) => product.price >= min && product.price <= max,
    });
  }
  */
}
