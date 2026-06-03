import type { MouseEvent } from "react";
import { useRouterContext } from "./router-context";

type Props = {
  children: React.ReactNode;
  className?: string;
  href: string;
};

export function Link({ href, children, className, ...rest }: Props) {
  const { navigate } = useRouterContext();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (
      e.button !== 0 ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey ||
      !href
    )
      return;

    navigate(href);
  };

  return (
    <a href={href} onClick={handleClick} className={className} {...rest}>
      {children}
    </a>
  );
}
