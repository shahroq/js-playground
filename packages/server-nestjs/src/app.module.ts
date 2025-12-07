import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
// import { CatalogModule } from "./catalog/catalog.module";
import { ReviewsModule } from "./modules/reviews/reviews.module";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
// import { SeedService } from './common/seed/seed.service';
import { CommonModule } from "./common/common.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "./data/data.sqlite",
      synchronize: true,
      // logging: true,
      // entities: [],
      autoLoadEntities: true,
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
