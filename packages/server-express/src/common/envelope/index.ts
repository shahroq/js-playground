import { config, t } from "@/common/container.ts";
import { PlainService } from "./providers/plain.service.ts";
import { JSendService } from "./providers/jsend.service.ts";
import { JsonApiService } from "./providers/json-api.service.ts";
import type { IEnvelopeService } from "./envelope-service.interface.ts";

type EnvelopeServiceProvider = new (...args: any[]) => IEnvelopeService;

const module = "envelope service";
const strategy = config.envelope.strategy;

console.log(t("CONSOLE.GET_PROVIDER", { module, strategy }));

let provider: EnvelopeServiceProvider;
switch (strategy) {
  case "plain":
    provider = PlainService;
    break;
  case "jsend":
    provider = JSendService;
    break;
  case "json-api":
    provider = JsonApiService;
    break;
  default:
    throw new Error(t("CONSOLE.NO_PROVIDER", { module, strategy }));
}

export { provider as EnvelopeService };
