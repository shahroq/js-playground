import { QueryClient } from "@tanstack/react-query";
import { createHttpClient } from "@jsp/shared/lib";

//TanStack Query is agnostic about how you actually fetch data. The queryFn (and mutationFn) is completely up to you — it can be fetch, Axios, your own wrapper, etc. It doesn't assume any particular HTTP client or URL structure.
export const API_URL = "http://localhost:3009";
export const MAX_RETRIES = 2;

// Create a client
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      //prevents unnecessary refetches when users navigate around quickly.
      staleTime: 30_000,
      // v5+
      gcTime: process.env.NODE_ENV === "development" ? 0 : 5 * 60 * 1000,
      // v4
      // cacheTime: 0,
      retry: MAX_RETRIES,
    },
    mutations: {
      retry: 0,
    },
  },
});

// create httpClient and export
export const httpClient = createHttpClient(API_URL, "fetch");
