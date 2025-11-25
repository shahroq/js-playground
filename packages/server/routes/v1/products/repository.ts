import type { Product } from "./type";
import { BaseRepository } from "@/common/repository/base-repository";

export class ProductRepository extends BaseRepository<Product> {
  constructor() {
    super("products", {
      // defaultPerPage: 1,
      defaultOrder: { sort: "id", direction: "asc" },
      allowedSortFields: ["id", "name", "price", "created_at"],
      searchableFields: ["name", "description"],
      filterableFields: ["id", "name", "category", "price", "in_stock"],
      expandableCollections: ["reviews"],
    });
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
