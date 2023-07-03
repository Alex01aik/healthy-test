import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connect = async () => {
  try {
    mongoose.connect(process.env.DB_URL ?? '');
    const database = mongoose.connection;

    database.once('connected', () => {
      console.log('Database Connected');
    });
  } catch (err: any) {
    console.error(err);
  }
};
