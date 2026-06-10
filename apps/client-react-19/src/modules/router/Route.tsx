import { type PropsWithChildren, type ReactNode } from "react";
import { useRouterContext } from "./router-context";

type Props = PropsWithChildren<{ path: string }>;

/**
 * Conditional route renderer.
 *
 * This component renders its `children` only when the current
 * router path matches the provided `path` prop.
 *
 * It relies on `useRouterContext()` to access the current
 * navigation state (`curPath`).
 */
export function Route({ path, children }: Props) {
  const { curPath } = useRouterContext();
  return path === curPath ? children : null;
}
