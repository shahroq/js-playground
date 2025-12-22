import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import type { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter<T extends HttpException>
  implements ExceptionFilter
{
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    // const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();
    // const [res] = host.getArgs();

    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    const err =
      typeof res === 'string'
        ? { message: exceptionResponse }
        : (exceptionResponse as object);

    res.status(status).json({ ...err });
  }
}
