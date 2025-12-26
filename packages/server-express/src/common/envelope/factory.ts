import { t } from "@/common/container.ts";
import { JSendAdapter } from "./jsend.adapter.ts";
import { JsonApiAdapter } from "./json-api.adapter.ts";
import type { EnvelopeStrategy } from "./envelope.interface.ts";

let className = null;
const adapter = "envelope";

export function envelopeAdapterFactory(strategy: EnvelopeStrategy) {
  console.log(t("console.getAdapter", { adapter, strategy }));

  switch (strategy) {
    case "jsend":
      className = JSendAdapter;
      break;
    case "json-api":
      className = JsonApiAdapter;
      break;
    default:
      throw new Error(t("console.noAdapter", { adapter, strategy }));
  }

  return className;
}

export function resetAppEnvelope(): void {
  className = null;
}
