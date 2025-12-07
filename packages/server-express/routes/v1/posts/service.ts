import type { Post } from "./types";
import type { IHttpClient } from "@/common/http-client/http-client.interface";
import type { EntityId } from "@/common/types";

export class PostService {
  constructor(private readonly httpClient: IHttpClient) {}

  async findAll(): Promise<Post[]> {
    return this.httpClient.get<Post[]>(`/posts`);

    /*
    try {
      const items = await httpClient.get<Post[]>(`/posts`);
      res
        .status(200)
        .json(formatter.format(null, { [`${collection}s`]: items }));
    } catch (error) {
      console.log(error);
      // res.json(formatter.format(error));
      // return next(AppError.internal());
      res.status(500).json(formatter.format(error));
    }
    */
  }

  async find(id: EntityId): Promise<Post | null> {
    const item = await this.httpClient.get<Post>(`/posts/${id}`);
    return item;
  }
}
