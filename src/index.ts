import express from 'express';
import cors from 'cors';
import appointmentRouter from './appointment/router';
import userRouter from './user/router';
import doctorRouter from './doctor/router';
import mongoose from 'mongoose';
import notificationService from './notification/service';
import { connect } from './db/connect';
import dotenv from 'dotenv';

dotenv.config();
connect();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/appointment', appointmentRouter);
app.use('/user', userRouter);
app.use('/doctor', doctorRouter);

setInterval(
  notificationService.findCustomers,
  Number(process.env.MIN_PERIOD) * 60 * 1000,
);

app.listen(port, () => {
  console.log(`"Healthy" server is running on port ${port}`);
});
