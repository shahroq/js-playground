import { Injectable } from '@nestjs/common';
import { Post } from './entirties/post.entity';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class PostsService {
  constructor(private readonly httpService: HttpService) {}

  async findAll() {
    // const items = await this.httpService.axiosRef.get(`/posts`);

    const { data: items } = await firstValueFrom(
      this.httpService.get<Post[]>(`/posts`).pipe(
        catchError((error: AxiosError) => {
          throw error;
        }),
      ),
    );

    return items;
  }
}
