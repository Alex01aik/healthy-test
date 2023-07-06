import nodemailer from 'nodemailer';
import { INotificationProvider } from './types/INotificationProvider';

export class MailNotificationProvider implements INotificationProvider<string> {

    private transport = nodemailer.createTransport(
        {
          host: process.env.MAIL_HOST,
          port: Number(process.env.MAIL_PORT),
          secure: false,
          auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD,
          },
        },
        {
          from: 'Healthy test',
        },
      );
    
    async sendNotification(email: string, code?: string) {
        await this.transport.sendMail(
          {
            to: `${email}`,
            subject: 'Reminder to visit doctor',
            html: `<h2>${code ?? 'Go to doctor'}</h2>`,
          },
          (err: any) => {
            return console.error(err);
          },
        );
      }
}
  
export const mailProvider = new MailNotificationProvider();