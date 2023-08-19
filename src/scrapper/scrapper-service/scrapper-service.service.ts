import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import { AppService } from 'src/app.service';

@Injectable()
export class ScrapperServiceService {
  constructor(private readonly mailService: AppService) {}
  async getScrappedData() {
    try {
      let data: any;
      //const data: { title: string; description: string; link: string }[] = [];
      const browser = await puppeteer.launch({ headless: false });
      const page = await browser.newPage();
      await page.goto('https://khamsat.com/community/requests', {
        waitUntil: 'networkidle2',
      });
      //const moreItems = true;
      await page
        .evaluate(() => {
          const result = document.querySelector('tbody');
          const data: { title: string; description: string; link: string }[] =
            [];
          if (result) {
            const result2 = result.querySelectorAll('a.ajaxbtn');
            if (result2.length > 0) {
              result2.forEach((element) => {
                data.push({
                  title: element.innerHTML,
                  description: element.innerHTML,
                  link: `https://khamsat.com/community/requests/670490-${element.innerHTML}`,
                });
                console.log('res', {
                  title: element.innerHTML,
                  description: element.innerHTML,
                  link: `https://khamsat.com/community/requests/670490-${element.innerHTML}`,
                });
              });
            }
          }
          return data;
        })
        .catch((err) => {
          return err;
        })
        .then((d) => {
          data = [...d];
        });
      await browser.close();
      /* data.forEach((offer) => {
        this.mailService.getHello({ title: offer.title, link: offer.link });
      });*/
      this.mailService.getHello({ title: data[0].title, link: data[0].link });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
