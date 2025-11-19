import type { Product } from "./type";
import { BaseRepository } from "@/common/base-repository";

export class ProductRepository extends BaseRepository<Product> {
  constructor() {
    super("products");
  }

  /*
  async findByCategory(category: string): Promise<Product[]> {
    return this.find({ where: { category } });
  }

  async findInStock(): Promise<Product[]> {
    return this.find({ where: { in_stock: true } });
  }

  async findByPriceRange(min: number, max: number): Promise<Product[]> {
    return this.find({
      where: (product: Product) => product.price >= min && product.price <= max,
    });
  }
  */
}
