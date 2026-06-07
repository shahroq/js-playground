import { pause } from "@gpublic/utils";
import { QueryClient } from "@tanstack/react-query";

// TODO: abstract away: fetch, axios, etc
// TODO: custom hook

//TanStack Query is agnostic about how you actually fetch data. The queryFn (and mutationFn) is completely up to you — it can be fetch, Axios, your own wrapper, etc. It doesn't assume any particular HTTP client or URL structure.
export const API_URL = "http://localhost:3009";
export const MAX_RETRIES = 2;
export const DELAY = process.env.NODE_ENV === "development" ? 500 : 0;

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

export async function apiFetch<T>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  await pause(DELAY);

  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers ?? {}),
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return response.json();
}
