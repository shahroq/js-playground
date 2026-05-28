import { PageTitle } from "@/comps";
import type { Page } from "@gpublic/types/types";

const page: Page = {
  title: "Dashboard",
  breadcrumb: [
    { label: "Dashboard" },
    { label: "Catalog w/ ReduxTK" },
    { label: "Products" },
  ],
};

export function ProductsPage() {
  return (
    <section>
      <PageTitle page={page} />
      <div>Products List</div>
    </section>
  );
}
