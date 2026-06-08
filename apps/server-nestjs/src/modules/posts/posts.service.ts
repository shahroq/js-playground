import { Injectable } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { Post } from './entities/post.entity';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class PostsService {
  private readonly baseUrl: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.baseUrl = this.configService.get<string>(
      'http_client.api_url_jsonplaceholder',
    ) as string;
  }

  async findAll() {
    const url = `${this.baseUrl}/posts`;

    /*
    const data = await this.httpService.axiosRef.get<Promise<Post[]>>(url);
    const items = data.data;
    */

    const { data: items } = await firstValueFrom(
      this.httpService.get<Promise<Post[]>>(url).pipe(
        catchError((error: AxiosError) => {
          throw error;
        }),
      ),
    );

    return items;
  }
}
