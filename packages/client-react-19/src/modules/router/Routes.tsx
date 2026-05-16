import { Route } from "./Route";
import { Dashboard } from "@/pages/Dashboard";
import { Home } from "@/pages/Home";

type Props = {};

const routes = [
  { path: "/", element: <Home /> },
  { path: "/dashboard", element: <Dashboard /> },
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
