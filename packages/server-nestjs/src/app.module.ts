import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from './common/common.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReviewsModule } from './modules/reviews/reviews.module';
// import { SeedService } from './common/seed/seed.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './data/data.sqlite',
      autoLoadEntities: true,
      // entities: [],
      // logging: true,
      synchronize: true,
    }),
    // CatalogModule,
    ReviewsModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  // providers: [AppService, SeedService],
  // exports: [SeedService],
})
export class AppModule {}
