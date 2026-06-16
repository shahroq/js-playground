"use client";
import type { PropsWithChildrenAndCN } from "../types/types";
import { cn } from "../utils";

// parent comp
function Hero({ children, className }: PropsWithChildrenAndCN) {
  return <div className={cn(`hero`, className)}>{children}</div>;
}

// sub comps
function Title({ children, className }: PropsWithChildrenAndCN) {
  return <h2 className={cn(`title`, className)}>{children}</h2>;
}

function Content({ children, className }: PropsWithChildrenAndCN) {
  return <div className={cn(`content`, className)}>{children}</div>;
}

// add child comps as props of parent comp
Hero.Title = Title;
Hero.Content = Content;

export { Hero };
