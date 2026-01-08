import { config } from "@/common/container";
import type { IHttbin } from "./types";
import type { IHttpClientService } from "@/common/http-client/http-client-service.interface";

export class HttpbinService {
  private readonly baseUrl: string;

  constructor(private readonly httpClientService: IHttpClientService) {
    this.baseUrl = config.api.httpbin.url;
  }

  async json(): Promise<IHttbin> {
    const url = `${this.baseUrl}/json`;

    return this.httpClientService.get<IHttbin>(url);
  }
}
