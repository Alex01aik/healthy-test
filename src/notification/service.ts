import nodemailer from 'nodemailer';
import Appointment from '../appointment/model';
import dotenv from 'dotenv';

dotenv.config();

class NotificationService {
  private transport = nodemailer.createTransport(
    {
      host: process.env.MAIL_HOST,
      port: 587,
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

  sendNotification(email: string, code?: string) {
    this.transport.sendMail(
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

  async findCustomers() {
    const actualDate = new Date();
    actualDate.setSeconds(0);
    actualDate.setMilliseconds(0);

    const nextDayDate = new Date();
    nextDayDate.setDate(actualDate.getDate() + 1);

    const afterTwoHourDate = new Date(actualDate);
    afterTwoHourDate.setHours(afterTwoHourDate.getHours() + 2);

    const appointments = await Appointment.find({
      $or: [
        {
          from: nextDayDate,
        },
        {
          from: afterTwoHourDate,
        },
      ],
    }).populate('user', 'email');

    const data = appointments?.map((app) => {
      return {
        date: app?.from,
        userEmail: (app?.user as any)?.email,
      };
    });

    data.map((item) =>
      this.sendNotification(
        item.userEmail,
        `You have an appointment to doctor at ${item.date}`,
      ),
    );
  }
}

export default new NotificationService();
