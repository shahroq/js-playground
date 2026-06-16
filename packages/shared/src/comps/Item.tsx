"use client";
import { type PropsWithChildren } from "react";
import type { PropsWithChildrenAndCN } from "../types/types";
import { cn } from "../utils";

type Props = PropsWithChildren<{
  as?: React.ElementType;
  className?: string;
  variant?: "default" | "outline" | "muted";
}>;

// parent comp
function Item({
  as: Component = "div",
  children,
  className,
  variant = "default",
}: Props) {
  return (
    <Component className={cn(`item`, className, `item-${variant}`)}>
      {children}
    </Component>
  );
}

function Content({ children, className }: PropsWithChildrenAndCN) {
  return <div className={cn(`item-content`, className)}>{children}</div>;
}
function Title({ children, className }: PropsWithChildrenAndCN) {
  return <p className={cn(`item-title`, className)}>{children}</p>;
}
function Description({ children, className }: PropsWithChildrenAndCN) {
  return <p className={cn(`item-description`, className)}>{children}</p>;
}

// add sub comps as props of parent comp
Item.Content = Content;
Item.Title = Title;
Item.Description = Description;

export { Item };
