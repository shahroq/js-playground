import type { CreateProductDto } from "./create-product.dto";

// Request Dto
export class UpdateProductDto implements Partial<CreateProductDto> {
  readonly name?: string;
  readonly description?: string;
  readonly price?: number;
  readonly category?: string;
  readonly in_stock?: boolean;
}
