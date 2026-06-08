import { type ReactNode } from "react";
import { useRouterContext } from "./router-context";

type Props = {
  path: string;
  children: ReactNode;
};

export function Route({ path, children }: Props) {
  const { curPath } = useRouterContext();
  return path === curPath ? children : null;
}
