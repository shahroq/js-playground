import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ApiKeyGuard } from './guards/api-key/api-key.guard';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TimeoutInterceptor } from './interceptors/timeout.interceptor';
import { EnvelopeStrategy } from './envelope-service/envelope.interface';
import { envelopeAdapterFactory } from './envelope-service/factory';
import { EnvelopInterceptor } from './interceptors/envelop.interceptor';
import { EnvelopHttpExceptionFilter } from './filters/http-exception.filter';
import { APP_ENVELOPE } from './common.constants';
// import { SeedService } from './common/seed/seed.service';
// import { LoggerMiddleware } from './middlewares/logger.middleware';
// import { SampleInterceptor } from './interceptors/sample.interceptor';

@Module({
  providers: [
    // SeedService,
    {
      provide: APP_ENVELOPE,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        envelopeAdapterFactory(
          configService.get<EnvelopeStrategy>('envelope.strategy', 'jsend'),
        ),
    },
    {
      provide: APP_FILTER,
      useClass: EnvelopHttpExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: ApiKeyGuard,
    },
    /*
    {
      provide: APP_INTERCEPTOR,
      useClass: SampleInterceptor,
    },
    */
    {
      provide: APP_INTERCEPTOR,
      useClass: TimeoutInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: EnvelopInterceptor,
    },
  ],
})
export class CommonModule {}
/*
export class CommonModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*path', method: RequestMethod.ALL });
  }
}
*/
