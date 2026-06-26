import { productSchema } from "@jsp/shared/validations/zod";
import { z } from "zod";

export type Product = z.infer<typeof productSchema> & {
  id: number;
  createdAt?: Date;
  updatedAt?: Date;
  createdBy?: number;
  updatedBy?: number;
};
