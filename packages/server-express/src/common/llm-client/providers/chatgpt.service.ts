import type { ILlmClientService } from "../llm-client-service.interface";

export class ChatgptLlmService implements ILlmClientService {
  constructor() {}
  summeraize(): string {
    throw new Error("Method not implemented.");
  }
}
