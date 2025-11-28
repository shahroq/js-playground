import config from "@/common/config.ts";
import type { AppResponse } from "./app-response.interface.ts";
import { JSend } from "./jsend.ts";
import { JsonApi } from "./json-api.ts";

let appResponseInstance: AppResponse | null = null;

function getAppResponse(): AppResponse {
  if (!appResponseInstance) {
    const format = config.app_response_strategy || "jsend";
    console.log(`⚙️  Getting app response formatter for strategy (${format})`);

    switch (format) {
      case "jsend":
        appResponseInstance = new JSend();
        break;
      case "json-api":
        appResponseInstance = new JsonApi();
        break;
      default:
        throw new Error(`Unsupported response format: ${format}`);
    }
  }

  return appResponseInstance;
}

export function resetAppResponse(): void {
  appResponseInstance = null;
}

// Export for convenience
export const appResponse = getAppResponse();
