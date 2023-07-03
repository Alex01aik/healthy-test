import express, { Request, Response } from 'express';
import appointmentService from './service';
import { CreateOneAppointmentArgs } from './types/CreateOneAppointmentArgs';

const router = express.Router();

router.post('/', async (req: Request & {body: CreateOneAppointmentArgs}, res: Response) => {
  await appointmentService.createOne(req, res);
});

export default router;
