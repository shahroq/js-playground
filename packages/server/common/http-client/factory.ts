import type { IHttpClient, HttpClientStrategy } from "./http-client.interface";
import { AxiosHttpClient } from "./axios-http-client";
import { config } from "@/common/container";

let httpClientInstance: IHttpClient | null = null;

export function getHttpClient(baseURL: string): IHttpClient {
  // TODO: check this? is it multipleton?!
  if (
    httpClientInstance &&
    httpClientInstance.getHttpClient().defaults.baseUrl === baseURL
  )
    return httpClientInstance;

  const strategy = config.http_client_strategy as HttpClientStrategy;
  console.log(`⚙️  Getting http client (${strategy})`);

  let httpClient;

  switch (strategy) {
    case "axios":
      httpClient = new AxiosHttpClient({ baseURL });
      break;
    default:
      throw new Error(`Unsupported http client strategy: ${strategy}`);
  }

  // Store the instance for future calls
  httpClientInstance = httpClient;

  return httpClientInstance;
}

// useful for testing
export function resetHttpClient(): void {
  httpClientInstance = null;
}
