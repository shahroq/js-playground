import { PageTitle } from "@/comps";
import type { Page } from "@packages/types/types";
import { ProductsList } from "./ProductsList";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./services/api";

const page: Page = {
  title: "Products",
  breadcrumb: [
    { label: "Dashboard" },
    { label: "Catalog w/ React Query" },
    { label: "Products" },
  ],
};

export default function ProductsPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <section>
        <PageTitle page={page} />
        <ProductsList />
      </section>

      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}
