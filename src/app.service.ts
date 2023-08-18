import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private readonly mailerService: MailerService) {}
  async getHello(): Promise<any> {
    try {
      const p = await this.mailerService.sendMail({
        to: 'abdoo.chbrik@gmail.com',
        subject: 'Welcome to our app!',
        text: 'welcome', // plaintext body
        html: '<b>welcome</b>', // HTML body content
      });

      console.log('p', p);
      return p;
    } catch (error) {
      console.log('error', error);
    }
  }
}
