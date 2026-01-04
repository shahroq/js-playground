import type { EntityId } from "@/common/types";
import type { IProduct } from "../types";
import { ReviewDto } from "@/common/container";

// Response Dto s
export class ProductDto {
  private constructor(
    public readonly id: EntityId,
    public readonly name: string,
    public readonly describtion: string,
    public readonly price: number,
    public readonly category: string,
    public readonly in_stock: boolean,
    public readonly submitted_at: Date,
    public readonly reviews?: ReviewDto[],
    public readonly review_count?: number,
    public readonly average_rating?: number
  ) {}

  static from(entity: IProduct): ProductDto {
    return new ProductDto(
      entity.id,
      entity.name,
      entity.description,
      entity.price,
      entity.category,
      entity.in_stock,
      entity.created_at,
      entity.reviews ? ReviewDto.fromMany(entity.reviews) : undefined,
      entity.review_count ?? undefined,
      entity.average_rating
        ? Number(entity.average_rating.toFixed(2))
        : undefined
    );
  }

  static fromMany(entities: IProduct[]): ProductDto[] {
    return entities.map((entity) => ProductDto.from(entity));
  }
}
