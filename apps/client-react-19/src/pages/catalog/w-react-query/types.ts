import type { Product } from "@jsp/shared/types";

export type FormState = {
  values?: Partial<Product>;
  message?: string;
  errors?: string[];
};
