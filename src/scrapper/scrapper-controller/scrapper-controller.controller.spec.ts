import { Test, TestingModule } from '@nestjs/testing';
import { ScrapperControllerController } from './scrapper-controller.controller';

describe('ScrapperControllerController', () => {
  let controller: ScrapperControllerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScrapperControllerController],
    }).compile();

    controller = module.get<ScrapperControllerController>(ScrapperControllerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
