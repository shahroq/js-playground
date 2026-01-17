import type {
  ILlmClientService,
  GenerateTextOptions,
} from "../llm-client-service.interface";

export class MockLlmService implements ILlmClientService {
  generateText(generateTextOptions: GenerateTextOptions): string {
    const { prompt } = generateTextOptions;
    const now = new Date().toISOString();

    const response = `This is the generated response for prompt as follows:
      ${prompt}
      Cheers,
      Mock LLM Service,
      ${now}`;

    return response;
  }
}
