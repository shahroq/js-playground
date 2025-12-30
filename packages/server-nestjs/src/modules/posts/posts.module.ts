import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    HttpModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        baseURL: config.get<string>('http_client.api_url_jsonplaceholder'),
        timeout: config.get<number>('default.timeout', 5000),
        maxRedirects: 5,
      }),
    }),
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
