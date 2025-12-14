import { AppError } from "@/common/container";
import type { IPost } from "./types";
import type { IHttpClient } from "@/common/http-client/http-client.interface";
import type { EntityId } from "@/common/types";

export class PostService {
  constructor(private readonly httpClient: IHttpClient) {}

  async getItems(): Promise<IPost[]> {
    return this.httpClient.get<IPost[]>(`/posts`);

    /*
    try {
    } catch (error) {
    }
    */
  }

  async getItem(id: EntityId): Promise<IPost | null> {
    const item = await this.httpClient.get<IPost>(`/posts/${id}`);
    if (!item) throw AppError.notFound();

    return item;
  }
}
