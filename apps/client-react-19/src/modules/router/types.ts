import type { ComponentType, ReactNode, ReactElement } from "react";

export type LayoutComponent = ComponentType<{
  children: ReactNode;
}>;

export type RouteConfig = {
  path: string;
  element?: ReactElement;
  layout?: LayoutComponent;
};
