import type { Object } from "./types";
import type { IHttpClient } from "@/common/http-client/http-client.interface";

export class ObjectService {
  constructor(private readonly httpClient: IHttpClient) {}

  async getItems(): Promise<Object[]> {
    return this.httpClient.get<Object[]>(`/objects`);
  }
}
