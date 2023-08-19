import { Module } from '@nestjs/common';
import { ScrapperControllerController } from './scrapper-controller/scrapper-controller.controller';
import { ScrapperServiceService } from './scrapper-service/scrapper-service.service';
import { AppService } from 'src/app.service';

@Module({
  controllers: [ScrapperControllerController],
  providers: [ScrapperServiceService, AppService],
})
export class ScrapperModule {}
