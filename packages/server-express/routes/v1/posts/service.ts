import { AppError } from "@/common/container";
import type { Post } from "./types";
import type { IHttpClient } from "@/common/http-client/http-client.interface";
import type { EntityId } from "@/common/types";

export class PostService {
  constructor(private readonly httpClient: IHttpClient) {}

  async getItems(): Promise<Post[]> {
    return this.httpClient.get<Post[]>(`/posts`);

    /*
    try {
    } catch (error) {
    }
    */
  }

  async getItem(id: EntityId): Promise<Post | null> {
    const item = await this.httpClient.get<Post>(`/posts/${id}`);
    if (!item) throw AppError.notFound();

    return item;
  }
}
