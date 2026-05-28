import type { Product } from "@gpublic/types/types";

export type FormState = {
  values?: Partial<Product>;
  message?: string;
  errors?: string[];
};
