import config from "@/common/config";
import type { Post } from "./type";
import { getHttpClient } from "@/common/http-client/factory";
import type { IHttpClient } from "@/common/http-client/http-client.interface";
import type { EntityId } from "@/common/type";

const base_url_source = config.api_url_jsonplaceholder as string;

export class PostService {
  private httpClient: IHttpClient;

  constructor() {
    this.httpClient = getHttpClient(base_url_source);
  }

  async getItems(): Promise<Post[]> {
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
  async getItem(id: EntityId): Promise<Post | null> {
    const item = await this.httpClient.get<Post>(`/posts/${id}`);
    return item;
  }
}
