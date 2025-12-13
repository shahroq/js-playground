import { config } from "@/common/container.ts";
import { JSendEnvelope } from "./jsend-envelope.ts";
import { JsonApiEnvelope } from "./json-api-envelope.ts";

let envelope = null;

export function getAppEnvelope() {
  const format = config.app_envelope.strategy || "jsend";

  console.log(
    `⚙️  Getting app response envelpe strategy class for (${format})`
  );
  switch (format) {
    case "jsend":
      envelope = JSendEnvelope;
      break;
    case "json-api":
      envelope = JsonApiEnvelope;
      break;
    default:
      throw new Error(`Unsupported envelope format: ${format}`);
  }

  return envelope;
}

export function resetAppEnvelope(): void {
  envelope = null;
}
