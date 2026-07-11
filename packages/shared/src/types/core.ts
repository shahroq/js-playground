import type { PropsWithChildren } from "react";

export type PropsWithCN = { className?: string };
export type PropsWithChildrenAndCN = PropsWithChildren & PropsWithCN;

export type EntityId = number | string;

export type NavItem = {
  label: string;
  path?: string;
  items?: NavItem[];
  target?: string[];
};

export type Page = {
  title: string;
  breadcrumb?: NavItem[];
};
