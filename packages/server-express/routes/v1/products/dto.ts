export class CreateProductDto {
  readonly name: string;
  readonly description?: string;
  readonly price: number;
  readonly category: string;
  readonly in_stock: boolean;
}

export type UpdateProductDto = Partial<CreateProductDto>;
