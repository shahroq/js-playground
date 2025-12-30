import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class HttpbinService {
  constructor(private readonly httpService: HttpService) {}

  async get() {
    const url = `/json`;

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
