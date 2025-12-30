import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ApiKeyGuard } from './guards/api-key/api-key.guard';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TimeoutInterceptor } from './interceptors/timeout.interceptor';
import { EnvelopeStrategy } from './envelope-service/envelope.interface';
import { envelopeAdapterFactory } from './envelope-service/factory';
import { WrapResponseInterceptor } from './interceptors/wrap-response.interceptor';
import { LoggerMiddleware } from './middlewares/logger.middleware';
// import { SeedService } from './common/seed/seed.service';

@Module({
  imports: [ConfigModule],
  providers: [
    // SeedService,
    {
      provide: APP_GUARD,
      useClass: ApiKeyGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TimeoutInterceptor,
    },
    {
      provide: 'APP_ENVELOPE',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        envelopeAdapterFactory(
          configService.get<EnvelopeStrategy>('envelope.strategy', 'jsend'),
        ),
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: WrapResponseInterceptor,
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
