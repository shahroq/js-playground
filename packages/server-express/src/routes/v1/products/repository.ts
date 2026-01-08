import type { IDbClientService } from "@/common/db-client/db-client-service.interface";
import type { IProduct } from "./types";
import { BaseRepository } from "@/common/repository/base.repository";

export class ProductRepository extends BaseRepository<IProduct> {
  constructor(dbAdapter: IDbClientService) {
    super("products", dbAdapter);
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
