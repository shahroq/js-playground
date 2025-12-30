import type { HttpClientStrategy, IHttpClient } from "./http-client.interface";
import { AxiosAdapter } from "./axios.adapter";
import { t } from "@/common/container";

let instance: IHttpClient | null;
const adapter = "http-client";

// factory: http client
export function createHttpClient(strategy: HttpClientStrategy): IHttpClient {
  if (instance) return instance;

  let httpClient;

  console.log(t("console.getAdapter", { adapter, strategy: `${strategy}` }));

  switch (strategy) {
    case "axios":
      httpClient = new AxiosAdapter({ timeout: 3000 });
      break;
    default:
      throw new Error(t("console.noAdapter", { adapter, strategy }));
  }

  // Store the instance for future calls
  instance = httpClient;

  return instance;
}

// useful for testing
export function resetHttpClients(): void {
  instance = null;
}
