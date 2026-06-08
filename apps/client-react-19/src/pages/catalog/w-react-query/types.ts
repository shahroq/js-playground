import type { Product } from "@packages/types/types";

export type FormState = {
  values?: Partial<Product>;
  message?: string;
  errors?: string[];
};
