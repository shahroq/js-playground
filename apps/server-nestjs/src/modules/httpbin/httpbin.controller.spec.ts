import { Test, TestingModule } from '@nestjs/testing';
import { HttpbinController } from './httpbin.controller';

describe('HttpbinController', () => {
  let controller: HttpbinController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HttpbinController],
    }).compile();

    controller = module.get<HttpbinController>(HttpbinController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
