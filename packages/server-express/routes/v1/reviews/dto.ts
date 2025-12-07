export class CreateReviewDto {
  readonly product_id: number;
  readonly content: string;
  readonly rating: number;
}

export type UpdateReviewDto = Partial<CreateReviewDto>;
