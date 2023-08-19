import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private readonly mailerService: MailerService) {}
  async getHello(offer: { title: string; link: string }): Promise<any> {
    try {
      const p = await this.mailerService.sendMail({
        to: 'abdoo.chbrik@gmail.com',
        subject: 'khamasat news',
        text: 'hello abdellatif',
        html: ` <div style="width: 300px; background-color: #f9f9f9; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); overflow: hidden;">
        <div style="padding: 16px;">
          <h4 style="margin-bottom: 8px; font-weight: bold;">${offer.title}</h4>
          <a href="${offer.link}" style="display: block; text-align: center; text-decoration: none; color: #007bff; background-color: #f7f7f7; padding: 8px 0; border-radius: 4px;">See more</a>
        </div>
      </div> `,
      });
      return p;
    } catch (error) {
      console.log('error', error);
    }
  }
}
