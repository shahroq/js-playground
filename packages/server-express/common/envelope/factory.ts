import { config, t } from "@/common/container.ts";
import { JSendAdapter } from "./jsend.adapter.ts";
import { JsonApiAdapter } from "./json-api.adapter.ts";

let className = null;

// factory: envelope (app response format)
export function getEnvelope() {
  const adapter = "envelope";
  const strategy = config.envelope.strategy || "jsend";

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
