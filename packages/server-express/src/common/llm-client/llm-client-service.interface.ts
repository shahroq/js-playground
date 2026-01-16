export type LlmClientStrategy = "mock" | "chatgpt" | "gemini";

export interface ILlmClientService {
  summeraize(): string;
}
