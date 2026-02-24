import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CatApiResponse } from './types';

/*
const API_URL = 'https://jsonplaceholder.typicode.com/photos/1';
docs: https://developers.thecatapi.com/view-account/ylX4blBYT9FaoVd6OhvR?report=bOoHBz-8t
*/
const API_URL = 'https://api.thecatapi.com/v1/images/search';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  private http = inject(HttpClient);

  getPhoto(): Observable<CatApiResponse[]> {
    return this.http.get<CatApiResponse[]>(API_URL, {
      headers: {},
    });
    /*
        .subscribe(
          (data) => {
            console.log(data);
          },
          (err) => {
            console.log(err);
          },
        );
        */
  }
}
