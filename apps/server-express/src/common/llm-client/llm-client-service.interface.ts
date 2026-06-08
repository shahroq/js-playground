import type { Awaitable } from "../types";

export type LlmClientStrategy = "mock" | "chatgpt" | "gemini";

export type GenerateTextOptions = {
  prompt: string;
  model?: string;
  instructions?: string;
  temprature?: number;
  maxToken?: number;
  previousResponseId?: string;
};

export interface ILlmClientService {
  generateText(generateTextOptions: GenerateTextOptions): Awaitable<string>;
}
