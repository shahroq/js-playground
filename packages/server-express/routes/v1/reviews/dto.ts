/*
ProductCreateDTO;
ProductUpdateDTO;
ProductResultDTO;
// ProductResultWithReviewDTO; // no need, make it optional in above
*/

export class CreateReviewDto {
  readonly product_id: number;
  readonly content: string;
  readonly rating: number;
}

export type UpdateReviewDto = Partial<CreateReviewDto>;
