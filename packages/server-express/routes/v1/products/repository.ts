import type { IDBAdapter } from "@/common/db-adapter/db-adapter.interface";
import type { Product } from "./types";
import { BaseRepository } from "@/common/repository/base.repository";
import { options } from "./options";

export class ProductRepository extends BaseRepository<Product> {
  constructor(dbAdapter: IDBAdapter) {
    super("products", options, dbAdapter);
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
