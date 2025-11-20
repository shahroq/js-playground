import config from "@/common/config/config.ts";
import type { ResponseFormatter } from "./types.ts";
import { JSendFormatter } from "./jsend-formatter.ts";
import { JsonApiFormatter } from "./json-api-formatter.ts";

let formatterInstance: ResponseFormatter | null = null;

function getFormatter(): ResponseFormatter {
  if (!formatterInstance) {
    const format = config.response_format_strategy || "jsend";
    console.log(`⚙️  Getting formatter for response strategy (${format})`);

    switch (format) {
      case "jsend":
        formatterInstance = new JSendFormatter();
        break;
      case "json-api":
        formatterInstance = new JsonApiFormatter();
        break;
      default:
        throw new Error(`Unsupported response format: ${format}`);
    }
  }

  return formatterInstance;
}

export function resetFormatter(): void {
  formatterInstance = null;
}

// Export for convenience
export const formatter = getFormatter();
