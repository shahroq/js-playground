import { Route } from "./Route";
import { HomePage } from "@/pages/HomePage";
import { DashboardPage } from "@/pages/DashboardPage";
import { CounterPage } from "@/pages/counter/plain/CounterPage";
import { CounterPage as CounterPageWContext } from "@/pages/counter/w-context/CounterPage";
import { CounterPage as CounterPageWReducer } from "@/pages/counter/w-reducer/CounterPage";
import { CounterPage as CounterPageWZustand } from "@/pages/counter/w-zustand/CounterPage";
import { DataPage } from "@/pages/comps/DataPage";
import { FormPage } from "@/pages/comps/FormPage";
import { MiscPage } from "@/pages/comps/MiscPage";

type Props = {};

const routes = [
  { path: "/", element: <HomePage /> },
  { path: "/dashboard", element: <DashboardPage /> },
  // comps
  { path: "/data", element: <DataPage /> },
  { path: "/form", element: <FormPage /> },
  { path: "/misc", element: <MiscPage /> },
  // counter
  { path: "/counter/plain", element: <CounterPage /> },
  { path: "/counter/w-context", element: <CounterPageWContext /> },
  { path: "/counter/w-reducer", element: <CounterPageWReducer /> },
  { path: "/counter/w-zustand", element: <CounterPageWZustand /> },
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
