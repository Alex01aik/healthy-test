import express, { Request, Response } from 'express';
import appointmentService from './service';
import { CreateOneAppointmentArgs } from './types/CreateOneAppointmentArgs';

const router = express.Router();

router.post(
  '/',
  async (req: Request & { body: CreateOneAppointmentArgs }, res: Response) => {
    try {
      const saved = await appointmentService.createOne({
        ...req.body,
        date: appointmentService.formatDateAccordingToTimeZone(
          req.headers['time-zone'],
          req.body.date
        ),
      });
      res.status(200).json(saved);
      
    } catch (error: any) {
      res.status(400).json({ message: error?.message });
    }
  },
);

export default router;
