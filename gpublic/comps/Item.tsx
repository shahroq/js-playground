"use client";
import { type PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  as?: React.ElementType;
  className?: string;
  variant?: "default" | "outline" | "muted";
}>;

type PropsWithClassName = PropsWithChildren<{ className?: string }>;

// parent comp
function Item({
  as: Component = "div",
  children,
  className,
  variant = "default",
}: Props) {
  return (
    <Component
      className={[`item`, className, `item-${variant}`]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </Component>
  );
}

function Content({ children, className }: PropsWithClassName) {
  return (
    <div className={[`item-content`, className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
}
function Title({ children, className }: PropsWithClassName) {
  return (
    <p className={[`item-title`, className].filter(Boolean).join(" ")}>
      {children}
    </p>
  );
}
function Description({ children, className }: PropsWithClassName) {
  return (
    <p className={[`item-description`, className].filter(Boolean).join(" ")}>
      {children}
    </p>
  );
}

// add sub comps as props of parent comp
Item.Content = Content;
Item.Title = Title;
Item.Description = Description;

export { Item };
