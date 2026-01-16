import type { EntityId } from "@/common/types";
import type { IProduct } from "../types";
import { ReviewDto, type ReviewAggregateDto } from "@/common/container";

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
    public readonly reviews?: ReviewAggregateDto
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
      ReviewDto.fromManyWithAggregate(
        entity.reviews,
        entity.review_count,
        entity.average_rating
      )
    );
  }

  static fromMany(entities: IProduct[]): ProductDto[] {
    return entities.map((entity) => ProductDto.from(entity));
  }
}
