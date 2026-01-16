import type { ILlmClientService } from "../llm-client-service.interface";

export class GeminiLlmService implements ILlmClientService {
  constructor() {}
  summeraize(): string {
    throw new Error("Method not implemented.");
  }
}
