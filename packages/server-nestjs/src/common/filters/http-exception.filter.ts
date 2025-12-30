import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import type { EnvelopeConstructor } from '../envelope-service/factory';
import { APP_ENVELOPE } from '../common.constants';

// @Catch(HttpException) // catch JUST HttpException
@Catch() // catch ALL HttpException
export class EnvelopHttpExceptionFilter<T extends HttpException>
  implements ExceptionFilter
{
  constructor(
    @Inject(APP_ENVELOPE)
    private readonly Envelope: EnvelopeConstructor,
  ) {}

  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    // const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();
    // OR:
    // const [res] = host.getArgs();

    const httpResponse = exception.getResponse();
    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const err =
      typeof res === 'string'
        ? { message: httpResponse, statusCode: httpStatus } // put it in an object if it's a string
        : (httpResponse as object);

    const envelope = new this.Envelope(err as Error, null);
    res.status(httpStatus).json(envelope);

    /*
    res.status(status).json({
      ...err,
      timestamp: new Date().toISOString(),
    });
    */
  }
}
