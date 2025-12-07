import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { CatalogModule } from "./catalog/catalog.module";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
// import { SeedService } from './common/seed/seed.service';

@Module({
  imports: [
    CatalogModule,
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "./data/data.sqlite",
      synchronize: true,
      // logging: true,
      // entities: [],
      autoLoadEntities: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
  // providers: [AppService, SeedService],
  // exports: [SeedService],
})
export class AppModule {}
