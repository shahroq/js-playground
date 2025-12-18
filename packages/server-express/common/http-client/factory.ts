import type { IHttpClient } from "./http-client.interface";
import { AxiosAdapter } from "./axios.adapter";
import { config, t } from "@/common/container";

const httpClientInstances = new Map<string, IHttpClient>();

let httpClient;

// multipleton!
export function getHttpClient(baseURL: string): IHttpClient {
  const adapter = "http-client";
  const strategy = config.http_client.strategy;

  console.log(
    t("console.getAdapter", { adapter, strategy: `${strategy}:${baseURL}` })
  );

  const existing = httpClientInstances.get(baseURL);
  if (existing) return existing;

  switch (strategy) {
    case "axios":
      httpClient = new AxiosAdapter({ baseURL });
      break;
    default:
      throw new Error(t("console.noAdapter", { adapter, strategy }));
  }

  // Store the instance for future calls
  httpClientInstances.set(baseURL, httpClient);

  return httpClient;
}

// useful for testing
export function resetHttpClients(): void {
  httpClientInstances.clear();
}
