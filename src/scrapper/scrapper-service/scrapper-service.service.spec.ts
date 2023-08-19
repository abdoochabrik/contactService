import { Test, TestingModule } from '@nestjs/testing';
import { ScrapperServiceService } from './scrapper-service.service';

describe('ScrapperServiceService', () => {
  let service: ScrapperServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScrapperServiceService],
    }).compile();

    service = module.get<ScrapperServiceService>(ScrapperServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
