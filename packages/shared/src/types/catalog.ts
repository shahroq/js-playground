export type Product = {
  id: string | number;
  name: string;
  description: string;
  price: number;
  category: string;
  in_stock: boolean;
  created_at: Date;
  updated_at: Date;
  created_by: number;
  updated_by: number;
};

export const productInitValues: Partial<Product> = {
  name: "",
  description: "",
  price: 0,
};
