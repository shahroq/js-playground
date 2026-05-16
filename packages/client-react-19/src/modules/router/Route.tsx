import { type ReactNode } from "react";
import { useNavContext } from "./use-nav-context";

type Props = {
  path: string;
  children: ReactNode;
};

export function Route({ path, children }: Props) {
  const { curPath } = useNavContext();
  return path === curPath ? children : null;
}
