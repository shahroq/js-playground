import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from './common/config/configuration';
import { CommonModule } from './common/common.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './modules/products/products.module';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { configSchemas } from './common/config/schema';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { WrapResponseInterceptor } from './common/interceptors/wrap-response.interceptor';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';
// import { SeedService } from './common/seed/seed.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      // ignoreEnvFile: true,
      validationSchema: configSchemas,
      isGlobal: true,
      envFilePath: '.env',
      load: [configuration],
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      // type: process.env.DATABASE_TYPE,
      // database: './data/data.sqlite',
      database: process.env.DATABASE_URL,
      autoLoadEntities: true,
      // entities: [],
      // logging: true,
      synchronize: true,
    }),
    /*
    TypeOrmModule.forRootAsync({
      // imports: [ConfigModule], // optional if global
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'sqlite',
        database: process.env.DATABASE_URL,
      }),
    }),
    */
    ProductsModule,
    ReviewsModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: TimeoutInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: WrapResponseInterceptor,
    },
  ],
  // providers: [AppService, SeedService],
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
