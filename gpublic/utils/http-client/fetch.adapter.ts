import { pause } from "../pause";
import type { HttpClientAdapter, HttpRequestOptions } from "./types";

// Adapter Factory: fetch api
export function createFetchAdapter(baseUrl: string): HttpClientAdapter {
  return {
    async request<T>(
      url: string,
      options: HttpRequestOptions = {},
    ): Promise<T> {
      const { method = "GET", data, headers, signal, delay } = options;

      if (delay) await pause(delay);

      const res = await fetch(`${baseUrl}${url}`, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        body: data ? JSON.stringify(data) : undefined,
        signal,
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);

      return (await res.json()) as T;
    },
  };
}
