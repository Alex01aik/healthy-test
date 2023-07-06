import Appointment from '../appointment/model';
import { mailProvider } from './mailProvider';
import { NotificationProvider } from './provider';

class NotificationService {
  mailProvider = new NotificationProvider<string>(mailProvider);

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
    // TODO another user cred for contact

    const data = appointments?.map((app) => {
      return {
        date: app?.from,
        userEmail: (app?.user as any)?.email,
      };
    });

    data.map((item) =>
      mailProvider.sendNotification(
        item.userEmail,
        `You have an appointment to doctor at ${item.date}`,
      ),
    );
  }
}

export default new NotificationService();
