import { Fragment, lazy, Suspense } from "react";
import { Spinner } from "@jsp/shared/comps";
import { pause } from "@jsp/shared/lib";

// Layouts
import DashboardLayout from "@/layouts/DashboardLayout";

// Pages:
// root
import NotFound from "@/pages/NotFound";
import HomePage from "@/pages/HomePage";
import DashboardPage from "@/pages/DashboardPage";
import SandboxPage from "@/pages/SandboxPage";
// auth
import AuthPage from "@/pages/auth/plain/AuthPage";
// counter
import CounterPage from "@/pages/counter/plain/CounterPage";
import CounterPageWContext from "@/pages/counter/w-context/CounterPage";
import CounterPageWReducer from "@/pages/counter/w-reducer/CounterPage";
import CounterPageWReduxToolkit from "@/pages/counter/w-redux-toolkit/CounterPage";
import CounterPageWZustand from "@/pages/counter/w-zustand/CounterPage";
// comps
import DataPage from "@/pages/comps/DataPage";
import ModalPage from "@/pages/comps/ModalPage";
import MiscPage from "@/pages/comps/MiscPage";
const LazyPage = lazy(async () => {
  await pause(1500);
  return import("@/pages/comps/LazyPage");
});
import AudioPage from "@/pages/comps/AudioPage";
import FormPagePC from "@/pages/comps/form/plain-controlled/FormPage";
import FormPagePUC from "@/pages/comps/form/plain-uncontrolled/FormPage";
import FormPageWFDAPI from "@/pages/comps/form/w-formdata-api/FormPage";
import FormPageWUAS from "@/pages/comps/form/w-useactionstate/FormPage";
import FormPageWRHF from "@/pages/comps/form/w-react-hook-form/FormPage";
// catalog
import ProductsPageWRTK from "@/pages/catalog/w-redux-toolkit-query/ProductsPage";
import ProductPageWRQ from "@/pages/catalog/w-react-query/ProductsPage";
import type { RouteConfig } from "./types";

export const defaultLayout = DashboardLayout;

export const routesConfig: RouteConfig[] = [
  { path: "/", element: <HomePage /> },
  { path: "/dashboard", element: <DashboardPage /> },
  // { path: "/sandbox", element: <SandboxPage />, layout: Fragment },
  { path: "/sandbox", element: <SandboxPage /> },
  // auth
  { path: "/auth/plain", element: <AuthPage /> },
  // comps
  { path: "/comps/data", element: <DataPage /> },
  { path: "/comps/modal", element: <ModalPage /> },
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
  { path: "/counter/w-redux-toolkit", element: <CounterPageWReduxToolkit /> },
  { path: "/counter/w-zustand", element: <CounterPageWZustand /> },
  // catalog
  {
    path: "/catalog/w-redux-toolkit-query/products",
    element: <ProductsPageWRTK />,
  },
  { path: "/catalog/w-react-query/products", element: <ProductPageWRQ /> },

  // { path: "*", element: <NotFound /> },
] as const;
