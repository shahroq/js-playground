import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [
    HttpModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        // baseURL: config.get<string>('http_client.api_url_jsonplaceholder'),
        timeout: config.get<number>('default.timeout', 5000),
        maxRedirects: 5,
      }),
    }),
  ],
})
export class PostsModule {}
