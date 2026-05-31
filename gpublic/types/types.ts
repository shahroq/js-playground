export type NavItem = {
  label: string;
  path?: string;
  children?: NavItem[];
  target?: string[];
};

export type Page = {
  title: string;
  breadcrumb?: NavItem[];
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
