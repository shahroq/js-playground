import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from './common/common.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { WrapResponseInterceptor } from './common/interceptors/wrap-response.interceptor';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';
import { envelopeAdapterFactory } from './common/envelope-service/factory';
// import { SeedService } from './common/seed/seed.service';
import { ProductsModule } from './modules/products/products.module';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { PostsModule } from './modules/posts/posts.module';
import { EnvelopeStrategy } from './common/envelope-service/envelope.interface';
import { configSchemas } from './config/schema';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      // ignoreEnvFile: true,
      validationSchema: configSchemas,
      isGlobal: true,
      envFilePath: '.env',
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'sqlite',
        database: configService.get<string>('database.url'),
        autoLoadEntities: true,
        // entities: [Product, Review, Category],
        // logging: true,
        synchronize: true, // only in dev
      }),
    }),
    // CommonModule,
    ProductsModule,
    ReviewsModule,
    PostsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // SeedService,
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
  // exports: [SeedService],
})
export class AppModule {}
/*
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
*/
