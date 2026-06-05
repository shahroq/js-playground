import { lazy, Suspense } from "react";
import { Route } from "./Route";
import { Spinner } from "@gpublic/comps";
import { pause } from "@gpublic/utils/pause";
// Pages
import HomePage from "@/pages/HomePage";
import DashboardPage from "@/pages/DashboardPage";
// auth
import AuthPage from "@/pages/auth/plain/AuthPage";
// counter
import CounterPage from "@/pages/counter/plain/CounterPage";
import CounterPageWContext from "@/pages/counter/w-context/CounterPage";
import CounterPageWReducer from "@/pages/counter/w-reducer/CounterPage";
import CounterPageWReduxTK from "@/pages/counter/w-reduxtk/CounterPage";
import CounterPageWZustand from "@/pages/counter/w-zustand/CounterPage";
// comps
import DataPage from "@/pages/comps/DataPage";
import MiscPage from "@/pages/comps/MiscPage";
const LazyPage = lazy(async () => {
  await pause(2000);
  return import("@/pages/comps/LazyPage");
});
import AudioPage from "@/pages/comps/AudioPage";
import FormPagePC from "@/pages/comps/form/plain-controlled/FormPage";
import FormPagePUC from "@/pages/comps/form/plain-uncontrolled/FormPage";
import FormPageWFDAPI from "@/pages/comps/form/w-formdata-api/FormPage";
import FormPageWUAS from "@/pages/comps/form/w-useactionstate/FormPage";
import FormPageWRHF from "@/pages/comps/form/w-react-hook-form/FormPage";
// catalog
import ProductsPageWRTK from "@/pages/catalog/w-reduxtk/ProductsPage";
import ProductPageWRQ from "@/pages/catalog/w-react-query/ProductsPage";

const routes = [
  { path: "/", element: <HomePage /> },
  { path: "/dashboard", element: <DashboardPage /> },
  // auth
  { path: "/auth/plain", element: <AuthPage /> },
  // comps
  { path: "/comps/data", element: <DataPage /> },
  { path: "/comps/misc", element: <MiscPage /> },
  {
    path: "/comps/lazy",
    element: (
      <Suspense fallback={<Spinner className="spinner-lg" />}>
        <LazyPage />
      </Suspense>
    ),
  },
  { path: "/comps/audio", element: <AudioPage /> },
  { path: "/comps/form" },
  { path: "/comps/form/plain-controlled", element: <FormPagePC /> },
  { path: "/comps/form/plain-uncontrolled", element: <FormPagePUC /> },
  { path: "/comps/form/w-formdata-api", element: <FormPageWFDAPI /> },
  { path: "/comps/form/w-useactionstate", element: <FormPageWUAS /> },
  { path: "/comps/form/w-react-hook-form", element: <FormPageWRHF /> },
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

export function Routes() {
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
