export type Crumb = {
  label: string;
  path?: string;
};

export type Page = {
  title: string;
  breadcrumb?: Crumb[];
};

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
