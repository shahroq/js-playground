import type { Post } from "./types";
import type { IHttpClient } from "@/common/http-client/http-client.interface";
import type { EntityId } from "@/common/types";

export class PostService {
  constructor(private readonly httpClient: IHttpClient) {}

  async findAll(): Promise<Post[]> {
    return this.httpClient.get<Post[]>(`/posts`);

    /*
    try {
    } catch (error) {
    }
    */
  }

  async find(id: EntityId): Promise<Post | null> {
    const item = await this.httpClient.get<Post>(`/posts/${id}`);
    return item;
  }
}
