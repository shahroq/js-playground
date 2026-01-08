import { config, t } from "@/common/container";
import type { IHttpClientService } from "./http-client-service.interface";
import { AxiosService } from "./providers/axios.service";

const module = "http client service";
const strategy = config.http_client.strategy;

let provider: IHttpClientService;

console.log(t("console.getProvider", { module, strategy }));

switch (strategy) {
  case "axios":
    provider = new AxiosService({ timeout: 3000 });
    break;
  default:
    throw new Error(t("console.noProvider", { module, strategy }));
}

export { provider as httpClientService };
