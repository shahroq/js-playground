import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { PageTitle } from "@/comps";
import type { Page } from "@gpublic/types/types";
import { ProductsList } from "./ProductsList";

const page: Page = {
  title: "Dashboard",
  breadcrumb: [
    { label: "Dashboard" },
    { label: "Catalog w/ React Query" },
    { label: "Products" },
  ],
};

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      gcTime: 0, // v5+
      // cacheTime: 0,     // v4
      refetchOnMount: true,
    },
  },
});

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
