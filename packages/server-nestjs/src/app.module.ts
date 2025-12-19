import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from './common/config/configuration';
import { CommonModule } from './common/common.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { configSchemas } from './common/config/schema';
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
    ReviewsModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  // providers: [AppService, SeedService],
  // exports: [SeedService],
})
export class AppModule {}
