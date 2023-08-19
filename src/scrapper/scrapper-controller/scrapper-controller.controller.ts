import { Controller, Get } from '@nestjs/common';
import { ScrapperServiceService } from '../scrapper-service/scrapper-service.service';

@Controller('scrapper')
export class ScrapperControllerController {
  constructor(private readonly scrapperService: ScrapperServiceService) {}
  @Get()
  public async testScrapper() {
    return await this.scrapperService.getScrappedData();
  }
}
