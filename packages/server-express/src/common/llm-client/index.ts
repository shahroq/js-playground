import { config, t } from "@/common/container";
import type { ILlmClientService } from "./llm-client-service.interface";
import { MockLlmService } from "./providers/mock.service";
import { ChatgptLlmService } from "./providers/chatgpt.service";
import { GeminiLlmService } from "./providers/gemini.service";

const module = "llm client service";
const strategy = config.llm_client.strategy;

let provider: ILlmClientService;

console.log(t("CONSOLE.GET_PROVIDER", { module, strategy }));

switch (strategy) {
  case "mock":
    provider = new MockLlmService();
    break;
  case "chatgpt":
    provider = new ChatgptLlmService();
    break;
  case "mock":
    provider = new GeminiLlmService();
    break;
  default:
    throw new Error(t("CONSOLE.NO_PROVIDER", { module, strategy }));
}

export { provider as llmClientService };
