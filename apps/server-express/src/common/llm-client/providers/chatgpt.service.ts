import type { ILlmClientService } from "../llm-client-service.interface";
import type { IHttpClientService } from "@/common/http-client/http-client-service.interface";

export class ChatgptLlmService implements ILlmClientService {
  constructor(private readonly httpClientService: IHttpClientService) {}

  async generateText(): Promise<string> {
    const response = `This a review summary base on provided reviews`;
    /*
    const response = await client.response.create({
      prompt,
      model,
      temprature,
      max_output_token: maxToken,
    });
    */

    return response.output_text;
  }
}
