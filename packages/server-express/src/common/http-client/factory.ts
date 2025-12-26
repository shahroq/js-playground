import type { HttpClientStrategy, IHttpClient } from "./http-client.interface";
import { AxiosAdapter } from "./axios.adapter";
import { t } from "@/common/container";

const instances = new Map<string, IHttpClient>();
let instance;
const adapter = "http-client";

// factory: http client (multipleton!)
export function createHttpClient(
  strategy: HttpClientStrategy,
  baseURL: string
): IHttpClient {
  console.log(
    t("console.getAdapter", { adapter, strategy: `${strategy}:${baseURL}` })
  );

  const existing = instances.get(baseURL);
  if (existing) return existing;

  switch (strategy) {
    case "axios":
      instance = new AxiosAdapter({ baseURL });
      break;
    default:
      throw new Error(t("console.noAdapter", { adapter, strategy }));
  }

  // Store the instance for future calls
  instances.set(baseURL, instance);

  return instance;
}

// useful for testing
export function resetHttpClients(): void {
  instances.clear();
}
