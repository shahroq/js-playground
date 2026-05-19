import { Route } from "./Route";
import { HomePage } from "@/pages/HomePage";
import { DashboardPage } from "@/pages/DashboardPage";
import { CounterPage } from "@/pages/counter/plain/CounterPage";
import { CounterPage as CounterPageWContext } from "@/pages/counter/w-context/CounterPage";
import { CounterPage as CounterPageWReducer } from "@/pages/counter/w-reducer/CounterPage";
import { CounterPage as CounterPageWZustand } from "@/pages/counter/w-zustand/CounterPage";
import { DummyPage } from "@/pages/comps/DummyPage";
import { DataPage } from "@/pages/comps/DataPage";
import { FormPage } from "@/pages/comps/FormPage";

type Props = {};

const routes = [
  { path: "/", element: <HomePage /> },
  { path: "/dashboard", element: <DashboardPage /> },
  // comps
  { path: "/dummy", element: <DummyPage /> },
  { path: "/data", element: <DataPage /> },
  { path: "/form", element: <FormPage /> },
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
