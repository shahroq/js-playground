import type { IObject } from "./types";
import type { IHttpClient } from "@/common/http-client/http-client.interface";

export class ObjectService {
  constructor(private readonly httpClient: IHttpClient) {}

  async getItems(): Promise<IObject[]> {
    return this.httpClient.get<IObject[]>(`/objects`);
  }
}
