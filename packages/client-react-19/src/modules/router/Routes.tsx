import { Route } from "./Route";
import { HomePage } from "@/pages/HomePage";
import { DashboardPage } from "@/pages/DashboardPage";
import { CounterPage } from "@/pages/counter/plain/CounterPage";
import { CounterPage as CounterPageWContext } from "@/pages/counter/w-context/CounterPage";
import { CounterPage as CounterPageWReducer } from "@/pages/counter/w-reducer/CounterPage";
import { CounterPage as CounterPageWReduxTK } from "@/pages/counter/w-reduxtk/CounterPage";
import { CounterPage as CounterPageWZustand } from "@/pages/counter/w-zustand/CounterPage";
import { DataPage } from "@/pages/comps/DataPage";
import { FormPage as FormPagePC } from "@/pages/comps/form/plain-controlled/FormPage";
import { MiscPage } from "@/pages/comps/MiscPage";
import { ProductsPage as ProductsPageWRTK } from "@/pages/catalog/w-reduxtk/ProductsPage";
import { ProductsPage as ProductPageWRQ } from "@/pages/catalog/w-react-query/ProductsPage";

type Props = {};

const routes = [
  { path: "/", element: <HomePage /> },
  { path: "/dashboard", element: <DashboardPage /> },
  // comps
  { path: "/comps/data", element: <DataPage /> },
  { path: "/comps/form" },
  { path: "/comps/form/plain-controlled", element: <FormPagePC /> },
  { path: "/comps/form/plain-uncontrolled" },
  { path: "/comps/form/w-formdata-api" },
  { path: "/comps/form/w-use-action-state" },
  { path: "/comps/form/w-react-hook-form" },
  { path: "/comps/form/w-tanstack-form" },
  { path: "/comps/form/w-redux-form" },
  // counter
  { path: "/counter/plain", element: <CounterPage /> },
  { path: "/counter/w-context", element: <CounterPageWContext /> },
  { path: "/counter/w-reducer", element: <CounterPageWReducer /> },
  { path: "/counter/w-reduxtk", element: <CounterPageWReduxTK /> },
  { path: "/counter/w-zustand", element: <CounterPageWZustand /> },
  // catalog
  { path: "/catalog/w-reduxtk/products", element: <ProductsPageWRTK /> },
  { path: "/catalog/w-react-query/products", element: <ProductPageWRQ /> },

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
