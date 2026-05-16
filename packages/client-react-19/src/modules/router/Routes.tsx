import { Route } from "./Route";
import { HomePage } from "@/pages/HomePage";
import { DashboardPage } from "@/pages/DashboardPage";
import { CounterPage } from "@/pages/counter/plain/CounterPage";

type Props = {};

const routes = [
  { path: "/", element: <HomePage /> },
  { path: "/dashboard", element: <DashboardPage /> },
  { path: "/counter/plain", element: <CounterPage /> },
  // { path: "*", element: <NotFound /> },
] as const;

export function Routes({}: Props) {
  return (
    <>
      {routes.map((route) => (
        <Route path={route.path} key={route.path}>
          {route.element}
        </Route>
      ))}
    </>
  );
}
