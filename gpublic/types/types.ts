import type { PropsWithChildren } from "react";

export type PropsWithCN = { className?: string };
export type PropsWithChildrenAndCN = PropsWithChildren & PropsWithCN;

export type EntityId = number | string;

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

export type User = {
  id?: string | number;
  email: string;
  password: string;
  name?: string;
  avatar?: string;
};

export const userInitValues: User = {
  email: "",
  password: "",
  name: "",
  avatar: "",
};

export type Task = {
  id?: string | number;
  title: string;
  description: string;
  category: string;
};

export const taskInitValues: Task = {
  title: "",
  description: "",
  category: "work",
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
