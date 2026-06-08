import type { ILlmClientService } from "../llm-client-service.interface";
import type { IHttpClientService } from "@/common/http-client/http-client-service.interface";

export class GeminiLlmService implements ILlmClientService {
  constructor(private readonly httpClientService: IHttpClientService) {}

  generateText(): string {
    throw new Error("Method not implemented.");
  }
}
