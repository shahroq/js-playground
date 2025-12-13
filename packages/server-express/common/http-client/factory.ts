import type { IHttpClient, HttpClientStrategy } from "./http-client.interface";
import { AxiosHttpClient } from "./axios-http-client";
import { config } from "@/common/container";

const httpClientInstances = new Map<string, IHttpClient>();

// multipleton!
export function getHttpClient(baseURL: string): IHttpClient {
  const existing = httpClientInstances.get(baseURL);
  if (existing) return existing;

  const strategy = config.http_client.strategy as HttpClientStrategy;
  console.log(`⚙️  Getting http client (${strategy}) for ${baseURL}`);

  let httpClient;

  switch (strategy) {
    case "axios":
      httpClient = new AxiosHttpClient({ baseURL });
      break;
    default:
      throw new Error(`Unsupported http client strategy: ${strategy}`);
  }

  // Store the instance for future calls
  httpClientInstances.set(baseURL, httpClient);

  return httpClient;
}

// useful for testing
export function resetHttpClients(): void {
  httpClientInstances.clear();
}
