import { AppError, config, PostDto } from "@/common/container";
import type { IPost } from "./types";
import type { IHttpClient } from "@/common/http-client/http-client.interface";

export class PostService {
  private readonly baseUrl: string;

  constructor(private readonly httpClient: IHttpClient) {
    this.baseUrl = config.api.jsonplaceholder.url;
  }

  async getItems() {
    const url = `${this.baseUrl}/posts`;

    const items = await this.httpClient.get<IPost[]>(url);

    return PostDto.fromMany(items);

    /*
    try {
    } catch (error) {
    }
    */
  }

  async getItem(id: number) {
    const url = `${this.baseUrl}/posts/${id}`;

    const item = await this.httpClient.get<IPost>(url);
    if (!item) throw AppError.NotFound();

    return PostDto.from(item);
  }
}
