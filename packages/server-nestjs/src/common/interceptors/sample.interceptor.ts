import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable()
export class SampleInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // Run something before a request is handled:
    console.log(`--- I am running before the handler --->`, context, `<---`);

    return next.handle().pipe(
      map((data: any) => {
        // Run something before the response is sent oot
        console.log(`--- I am running before the handler --->`, data, `<---`);
      }),
      catchError((err) => {
        console.log(`--- Error caught in interceptor --->`, err, `<---`);

        // rethrow so exception filters / Nest can handle it
        return throwError(() => err);
      }),
    );
  }
}
