import type { HttpClientAdapter, Provider } from "./types";
import { createFetchAdapter } from "./fetch.adapter";
import { createAxiosAdapter } from "./axios.adapter";

// --- Factory ---
export function createHttpClient(
  baseUrl: string,
  provider: Provider = "fetch",
): HttpClientAdapter {
  switch (provider) {
    case "fetch":
      return createFetchAdapter(baseUrl);
    case "axios":
      return createAxiosAdapter(baseUrl);
    default:
      throw new Error(`Unsupported provider: ${provider}`);
  }
}

/*
// usage
const httpClient = createHttpClient("http://localhost:3009", "fetch");
// const { request } = createHttpClient("http://localhost:3009", "fetch");
const products = await httpClient.request<Product>("/products");
console.log(products);
*/
