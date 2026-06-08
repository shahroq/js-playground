import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class HttpbinService {
  private readonly baseUrl: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.baseUrl = this.configService.get<string>(
      'http_client.api_url_httpbin',
    ) as string;
  }

  async get() {
    const url = `${this.baseUrl}/json`;

    /*
    const data = await this.httpService.axiosRef.get<Promise<any>>(url);
    const items = data.data;
    */

    const { data: items } = await firstValueFrom(
      this.httpService.get<Promise<any>>(url).pipe(
        catchError((error: AxiosError) => {
          throw error;
        }),
      ),
    );

    return { items };
  }
}
