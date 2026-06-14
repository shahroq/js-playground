import NotFound from "@/pages/NotFound";
import { defaultLayout, routesConfig } from "./route-config";
import { useRouterContext } from "./router-context";

/**
 * App route renderer.
 *
 * This component iterates over the route configuration and renders
 * each route using the custom `<Route />` component.
 *
 * Layout resolution rules:
 * - If a route defines `layout`, it will be used.
 * - Otherwise, the `defaultLayout` is applied.
 *
 * Example:
 * - `/dashboard` → DashboardLayout (default)
 * - `/auth` → AuthLayout (override)
 * - `/embed` → React.Fragment (no layout)
 */
export function Routes() {
  const { curPath } = useRouterContext();
  const matchedRoute = routesConfig.find((route) => route.path === curPath);
  const Layout = matchedRoute?.layout ?? defaultLayout;

  return <Layout>{matchedRoute?.element ?? <NotFound />}</Layout>;
}
