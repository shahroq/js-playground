import { config } from "@/common/container";
import type { IHttbin } from "./types";
import type { IHttpClient } from "@/common/http-client/http-client.interface";

export class HttpbinService {
  private readonly baseUrl: string;

  constructor(private readonly httpClient: IHttpClient) {
    this.baseUrl = config.api.httpbin.url;
  }

  async json(): Promise<IHttbin> {
    const url = `${this.baseUrl}/json`;

    return this.httpClient.get<IHttbin>(url);
  }
}
