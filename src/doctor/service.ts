import { Request, Response } from 'express';
import Doctor from './model';

class DoctorService {
  async createOne(req: Request, res: Response) {
    const data = new Doctor({
      name: req.body.name,
      working_hours: req.body.working_hours,
    });

    try {
      const saved = await data.save();
      res.status(200).json(saved);
    } catch (error: any) {
      res.status(400).json({ message: error?.message });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const data = await Doctor.find();
      res.json(data);
    } catch (error: any) {
      res.status(500).json({ message: error?.message });
    }
  }

  async getOneById(_id: string) {
    try {
      const data = await Doctor.findById(_id);

      if (!data) {
        throw { message: 'Doctor does not exist!' };
      }

      return data;
    } catch (error: any) {
      throw error;
    }
  }

  async isExist(_id: string) {
    try {
      const data = await Doctor.findById(_id);
      if (!data) {
        throw { message: 'Doctor does not exist!' };
      }
    } catch (error: any) {
      throw error;
    }
  }
}

export default new DoctorService();
