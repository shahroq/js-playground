import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { HttpbinController } from './httpbin.controller';
import { HttpbinService } from './httpbin.service';

@Module({
  controllers: [HttpbinController],
  providers: [HttpbinService],
  imports: [
    HttpModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        baseURL: config.get<string>('http_client.api_url_httpbin'),
        timeout: config.get<number>('default.timeout', 5000),
        maxRedirects: 5,
      }),
    }),
  ],
})
export class HttpbinModule {}
