import { PageTitle } from "@/comps";
import type { Page } from "@gpublic/types/types";

import { Provider } from "react-redux";

const page: Page = {
  title: "Dashboard",
  breadcrumb: [
    { label: "Dashboard" },
    { label: "Catalog w/ ReduxTK" },
    { label: "Products" },
  ],
};

export default function ProductsPage() {
  return (
    <section>
      <PageTitle page={page} />
      <List />
    </section>
  );
}

function List() {
  return <div>Products List11</div>;
}
