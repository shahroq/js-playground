import { config } from "@/common/container.ts";
import type { AppEnvelope } from "./app-envelope.interface.ts";
import { JSend } from "./jsend.ts";
import { JsonApi } from "./json-api.ts";

let appEnvelopeInstance: AppEnvelope | null = null;

export function getAppEnvelope(): AppEnvelope {
  if (!appEnvelopeInstance) {
    const format = config.app_envelope_strategy || "jsend";
    console.log(`⚙️  Getting app response formatter for strategy (${format})`);

    switch (format) {
      case "jsend":
        appEnvelopeInstance = new JSend();
        break;
      case "json-api":
        appEnvelopeInstance = new JsonApi();
        break;
      default:
        throw new Error(`Unsupported response format: ${format}`);
    }
  }

  return appEnvelopeInstance;
}

export function resetAppEnvelope(): void {
  appEnvelopeInstance = null;
}
