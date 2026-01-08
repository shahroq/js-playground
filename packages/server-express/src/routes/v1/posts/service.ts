import { AppError, config, PostDto } from "@/common/container";
import type { IPost } from "./types";
import type { IHttpClientService } from "@/common/http-client/http-client-service.interface";

export class PostService {
  private readonly baseUrl: string;

  constructor(private readonly httpClientService: IHttpClientService) {
    this.baseUrl = config.api.jsonplaceholder.url;
  }

  async getItems() {
    const url = `${this.baseUrl}/posts`;

    const items = await this.httpClientService.get<IPost[]>(url);

    return PostDto.fromMany(items);

    /*
    try {
    } catch (error) {
    }
    */
  }

  async getItem(id: number) {
    const url = `${this.baseUrl}/posts/${id}`;

    const item = await this.httpClientService.get<IPost>(url);
    if (!item) throw AppError.NotFound();

    return PostDto.from(item);
  }
}
