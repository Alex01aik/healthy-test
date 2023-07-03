import { Request, Response } from 'express';
import Appointment from './model';
import userService from '../user/service';
import doctorService from '../doctor/service';
import { CreateOneAppointmentArgs } from './types/CreateOneAppointmentArgs';
import dotenv from 'dotenv';

dotenv.config();

class AppointmentService {
  async createOne(
    req: Request & { body: CreateOneAppointmentArgs },
    res: Response,
  ) {
    const userId: string = req.body.userId;
    const doctorId: string = req.body.doctorId;
    const date: Date = new Date(req.body.date);
    const duration: number = Number(req.body.duration);

    date.setSeconds(0);
    date.setMilliseconds(0);

    try {
      await this.validate(userId, doctorId, date, duration);
      const data = new Appointment({
        user: userId,
        doctor: doctorId,
        from: date,
        till: this.calculateTillDate(date, duration),
      });

      const saved = await data.save();

      res.status(200).json(saved);
    } catch (error: any) {
      res.status(400).json({ message: error?.message });
    }
  }

  async validate(
    userId: string,
    doctorId: string,
    date: Date,
    duration: number,
  ) {
    await Promise.all([
      userService.isExist(userId),
      doctorService.isExist(doctorId),
      this.validateDuration(duration),
      this.validateDate(date, duration, doctorId),
    ]);
    await this.isDoctorAccess(doctorId, date, duration);
  }

  calculateTillDate(date: Date, minutes: number): Date {
    const tillDate = new Date(date);
    tillDate.setTime(tillDate.getTime() + minutes * 60000);
    return tillDate;
  }

  validateDuration(duration: number): void {
    const isValid =
      duration >= 20 &&
      duration <= 120 &&
      duration % Number(process.env.MIN_PERIOD) === 0;
    if (!isValid) {
      throw { message: 'Invalid appointment duration!' };
    }
  }

  async validateDate(date: Date, duration: number, doctorId: string) {
    const minutes = date.getMinutes();
    if (minutes % Number(process.env.MIN_PERIOD) !== 0) {
      throw {
        message: `Wrong format, set visit period with ${Number(
          process.env.MIN_PERIOD,
        )} min range`,
      };
    }

    const newFrom = date;
    const newTill = this.calculateTillDate(date, duration);
    const data = await Appointment.findOne({
      $or: [
        {
          from: {
            $gte: newFrom,
            $lt: newTill,
          },
        },
        {
          till: {
            $lte: newTill,
            $gt: newFrom,
          },
        },
      ],
      doctor: doctorId,
    });
    if (data) {
      throw { message: 'The time is already taken!' };
    }
  }

  getWeekdayFromDate(date: Date): string {
    const weekdays = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const dayIndex = date.getDay();
    return weekdays[dayIndex];
  }

  async isDoctorAccess(doctorId: string, date: Date, duration: number) {
    const doctor = await doctorService.getOneById(doctorId);
    const day = this.getWeekdayFromDate(date);

    const weekDayHours = doctor.working_hours?.get(day);

    if (weekDayHours?.from && weekDayHours?.to) {
      this.compareHoursAndMinutesWithDate(weekDayHours.from, date, 'less');
      this.compareHoursAndMinutesWithDate(
        weekDayHours.to,
        this.calculateTillDate(date, duration),
        'more',
      );
    } else {
      throw { message: 'Wrong date!' };
    }
  }

  compareHoursAndMinutesWithDate(
    hoursAndMinutes: string,
    date: Date,
    condition?: 'less' | 'more',
  ) {
    const [hours, minutes] = hoursAndMinutes.split(':').map(Number);
    const workDate = new Date(date);
    workDate.setHours(hours + 1);
    workDate.setMinutes(minutes);
    if (condition === 'less') {
      if (workDate > date) {
        throw { message: 'Wrong date!' };
      }
    } else {
      if (workDate < date) {
        throw { message: 'Wrong date!' };
      }
    }
  }
}

export default new AppointmentService();
