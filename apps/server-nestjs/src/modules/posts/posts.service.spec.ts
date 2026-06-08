import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';
import { HttpService } from '@nestjs/axios';

describe('PostsService', () => {
  let service: PostsService;
  let httpService: HttpService;

  const httpServiceMock = {
    get: jest.fn(),
    post: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        {
          provide: HttpService,
          useValue: httpServiceMock,
        },
      ],
    }).compile();

    service = module.get<PostsService>(PostsService);
    httpService = module.get(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
