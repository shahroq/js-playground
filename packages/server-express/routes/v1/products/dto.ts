import type { EntityId } from "@/common/types";
import type { IProduct } from "./types";

// Request Dto s
export class CreateProductDto {
  readonly name: string;
  readonly description?: string;
  readonly price: number;
  readonly category: string;
  readonly in_stock: boolean;
}

export class UpdateProductDto implements Partial<CreateProductDto> {
  readonly name?: string;
  readonly description?: string;
  readonly price?: number;
  readonly category?: string;
  readonly in_stock?: boolean;
}

// Response Dto s
export class ProductDto {
  private constructor(
    public readonly id: EntityId,
    public readonly name: string,
    public readonly describtion: string,
    public readonly category: string,
    public readonly in_stock: boolean,
    public readonly submitted_at: Date
  ) {}

  static from(entity: IProduct): ProductDto {
    return new ProductDto(
      entity.id,
      entity.name,
      entity.description,
      entity.category,
      entity.in_stock,
      entity.created_at
    );
  }

  static fromMany(entities: IProduct[]): ProductDto[] {
    return entities.map((entity) => ProductDto.from(entity));
  }
}
