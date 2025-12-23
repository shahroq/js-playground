import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, map, Observable, throwError } from 'rxjs';
import { getEnvelopeAdapter } from '../envelope/envelope-factory';

// Best strategy: decide which implementation to use outside the interceptor and inject the resolved envelope service into it. gpt conv/Interceptor depends only on abstraction

@Injectable()
export class WrapResponseInterceptor implements NestInterceptor {
  constructor() {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const Envelope = getEnvelopeAdapter();

    return next.handle().pipe(
      map((data) => {
        const envelope = new Envelope(null, data);
        return envelope;
      }),
      // HERE?
      catchError((err) => {
        const envelope = new Envelope(err, null);
        return throwError(() => envelope);
      }),
    );
  }
}
