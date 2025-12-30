import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import type { EnvelopeConstructor } from '../envelope-service/factory';
import { APP_ENVELOPE } from '../common.constants';

// Best strategy: decide which implementation to use outside the interceptor and inject the resolved envelope service into it. gpt conv/Interceptor depends only on abstraction

@Injectable()
export class EnvelopInterceptor implements NestInterceptor {
  constructor(
    @Inject(APP_ENVELOPE)
    private readonly Envelope: EnvelopeConstructor,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data: any) => {
        const envelope = new this.Envelope(null, data);
        return envelope;
      }),
    );
  }
}
