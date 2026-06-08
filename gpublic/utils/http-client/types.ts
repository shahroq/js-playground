export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface HttpRequestOptions {
  method?: HttpMethod;
  data?: unknown; // fetch api uses body, axios, tanstach use data
  headers?: Record<string, string>;
  signal?: AbortSignal;
  delay?: number;
}

export interface HttpClientAdapter {
  request<T>(url: string, options?: HttpRequestOptions): Promise<T>;
}

export type Provider = "fetch" | "axios" | "mock";
