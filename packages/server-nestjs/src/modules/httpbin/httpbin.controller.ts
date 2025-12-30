import { Controller, Get } from '@nestjs/common';
import { HttpbinService } from './httpbin.service';

@Controller('httpbin')
export class HttpbinController {
  constructor(private readonly service: HttpbinService) {}

  @Get('/get')
  async get() {
    const data = await this.service.get();
    return data;
  }
}
