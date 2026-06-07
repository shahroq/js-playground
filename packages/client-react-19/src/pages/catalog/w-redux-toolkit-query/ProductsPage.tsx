import { PageTitle } from "@/comps";
import type { Page } from "@gpublic/types/types";
import { ProductList } from "./ProductsList";

import { store } from "./store";
import { Provider } from "react-redux";

const page: Page = {
  title: "Products",
  breadcrumb: [
    { label: "Dashboard" },
    { label: "Catalog w/ Redux Toolkit Query" },
    { label: "Products" },
  ],
};

export default function ProductsPage() {
  return (
    <Provider store={store}>
      <section>
        <PageTitle page={page} />
        <ProductList />
      </section>
    </Provider>
  );
}
