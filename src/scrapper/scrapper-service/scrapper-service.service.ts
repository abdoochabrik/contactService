import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import { AppService } from 'src/app.service';
import { Offer } from '../models/offer.model';
import { Cron, Interval } from '@nestjs/schedule';

@Injectable()
export class ScrapperServiceService {
  constructor(private readonly mailService: AppService) {}

  //@Cron('0 */1 * * *')
  // @Interval(5000)
  async getScrappedData() {
    try {
      const browser = await puppeteer.launch({ headless: false });
      const page = await browser.newPage();
      await page.goto('https://khamsat.com/community/requests', {
        waitUntil: 'networkidle2',
      });
      await page.evaluate(async () => {
        const tableBody = await document.querySelector('tbody');
        console.log('items', tableBody);
        //let items = await tableBody.querySelectorAll('a.ajaxbtn');
        //const items: any = [];
        //console.log('items', items);
        const loadMoreItemsButton = document.getElementById(
          'community_loadmore_btn',
        );
        // Simulate two consecutive clicks on the button
        loadMoreItemsButton.click();

        //await loadMoreItemsButton.click();
        /*loadMoreItemsButton.addEventListener('click', async () => {
            // This function will be executed when the button is clicked
            //items = await tableBody.querySelectorAll('a.ajaxbtn');
            console.log('utems', tableBody.querySelectorAll('a.ajaxbtn'));
            return tableBody.querySelectorAll('a.ajaxbtn');
          });*/
        //await loadMoreItemsButton.click();
        //await loadMoreItemsButton.click();
        // load items 10 times just for test
        /*for (let i = 0; i < 10; i++) {
            await loadMoreItemsButton.click();
            console.log('click');
          }*/

        //
        /*while (loadMoreItemsButton) {
            await loadMoreItemsButton.click();
            loadMoreItemsButton = await document.getElementById(
              'community_loadmore_btn',
            );
          }*/
        let items: any;
        setTimeout(async () => {
          items = await tableBody.querySelectorAll('a.ajaxbtn');
          //console.log('items', items);
          const offers: Offer[] = [];
          if (tableBody) {
            console.log('click out', items);
            if (items.length > 0) {
              items.forEach((element) => {
                offers.push({
                  title: element.innerHTML,
                  link: `https://khamsat.com/community/requests/670490-${element.innerHTML}`,
                });
              });
            }
          }
          console.log('length', offers.length);
          return offers;
        }, 3000);
      });
      /*.catch((err) => {
          throw new InternalServerErrorException(err);
        })
        .then(async (offers) => {
          console.log('length', offers.length);
          // this.mailService.getHello(offers);
          // await browser.close();
        });*/
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
