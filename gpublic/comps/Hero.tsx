"use client";
import { type PropsWithChildren } from "react";
import { cn } from "../utils";

type Props = PropsWithChildren & { className?: string };

// parent comp
function Hero({ children, className }: Props) {
  return <div className={cn(`hero`, className)}>{children}</div>;
}

// sub comps
function Title({ children, className }: Props) {
  return <h2 className={cn(`title`, className)}>{children}</h2>;
}

function Content({ children, className }: Props) {
  return <div className={cn(`content`, className)}>{children}</div>;
}

// add child comps as props of parent comp
Hero.Title = Title;
Hero.Content = Content;

export { Hero };
