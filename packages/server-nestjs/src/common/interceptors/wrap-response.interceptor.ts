import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, map, Observable, throwError } from 'rxjs';
import type { EnvelopeConstructor } from '../envelope-service/factory';

// Best strategy: decide which implementation to use outside the interceptor and inject the resolved envelope service into it. gpt conv/Interceptor depends only on abstraction

@Injectable()
export class WrapResponseInterceptor implements NestInterceptor {
  constructor(
    @Inject('APP_ENVELOPE')
    private readonly Envelope: EnvelopeConstructor,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => new this.Envelope(null, data)),
      // HERE
      catchError((err) => {
        const envelope = new this.Envelope(err, null);
        return throwError(() => envelope);
      }),
    );
  }
}
