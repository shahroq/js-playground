"use client";
import { type PropsWithChildren } from "react";

type Props = PropsWithChildren & { className?: string };

// parent comp
function Hero({ children, className }: Props) {
  return (
    <div className={[`hero`, className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
}

// sub comps
function Title({ children, className }: Props) {
  return (
    <h2 className={[`title`, className].filter(Boolean).join(" ")}>
      {children}
    </h2>
  );
}

function Content({ children, className }: Props) {
  return (
    <div className={[`content`, className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
}

// add child comps as props of parent comp
Hero.Title = Title;
Hero.Content = Content;

export { Hero };
