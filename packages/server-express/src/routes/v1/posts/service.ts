import { ApiError, PostDto } from "@/common/container";
import type { IPost } from "./types";
import type { IHttpClient } from "@/common/http-client/http-client.interface";

export class PostService {
  constructor(private readonly httpClient: IHttpClient) {}

  async getItems() {
    const items = await this.httpClient.get<IPost[]>(`/posts`);

    return PostDto.fromMany(items);

    /*
    try {
    } catch (error) {
    }
    */
  }

  async getItem(id: number) {
    const item = await this.httpClient.get<IPost>(`/posts/${+id}`);
    if (!item) throw ApiError.notFound();

    return PostDto.from(item);
  }
}
