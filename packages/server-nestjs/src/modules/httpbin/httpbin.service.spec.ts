import { Test, TestingModule } from '@nestjs/testing';
import { HttpbinService } from './httpbin.service';

describe('HttpbinService', () => {
  let service: HttpbinService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HttpbinService],
    }).compile();

    service = module.get<HttpbinService>(HttpbinService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
