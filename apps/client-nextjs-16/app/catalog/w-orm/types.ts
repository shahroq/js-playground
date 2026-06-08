import { productsTable, reviewsTable, categoriesTable } from "@/data/schema";
import { InferSelectModel } from "drizzle-orm";

export type Product = InferSelectModel<typeof productsTable>;
export type Review = InferSelectModel<typeof reviewsTable>;
export type Category = InferSelectModel<typeof categoriesTable>;

export type FormState<T> = {
  values?: Partial<T>;
  message?: string;
  errors?: string[];
};
