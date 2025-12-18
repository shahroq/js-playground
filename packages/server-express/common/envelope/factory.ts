import { config, t } from "@/common/container.ts";
import { JSendAdapter } from "./jsend.adapter.ts";
import { JsonApiAdapter } from "./json-api.adapter.ts";

let Envelope = null;

export function getEnvelope() {
  const adapter = "envelope";
  const strategy = config.envelope.strategy || "jsend";

  console.log(t("console.getAdapter", { adapter, strategy }));

  switch (strategy) {
    case "jsend":
      Envelope = JSendAdapter;
      break;
    case "json-api":
      Envelope = JsonApiAdapter;
      break;
    default:
      throw new Error(t("console.noAdapter", { adapter, strategy }));
  }

  return Envelope;
}

export function resetAppEnvelope(): void {
  Envelope = null;
}
