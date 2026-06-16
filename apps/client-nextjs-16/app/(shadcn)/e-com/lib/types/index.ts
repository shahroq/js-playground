import { z } from "zod";
import { productSchema } from "../validations";

export type Product = z.infer<typeof productSchema> & {
  id: number;
  createdAt?: Date;
  updatedAt?: Date;
  createdBy?: number;
  updatedBy?: number;
};
