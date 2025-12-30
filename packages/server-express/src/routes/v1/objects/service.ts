import type { IObject } from "./types";
import type { IHttpClient } from "@/common/http-client/http-client.interface";

export class ObjectService {
  constructor(private readonly httpClient: IHttpClient) {}

  async getItems(): Promise<IObject[]> {
    const url = `/objects`;

    return this.httpClient.get<IObject[]>(url);
  }
}
