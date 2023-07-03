import { Request, Response } from 'express';
import User from './model';

class UserService {
  async createOne(req: Request, res: Response) {
    try {
      const data = new User({
        name: req.body.name,
        email: req.body.email,
      });

      const saved = await data.save();
      res.status(200).json(saved);
    } catch (error: any) {
      res.status(400).json({ message: error?.message });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const data = await User.find();
      res.json(data);
    } catch (error: any) {
      res.status(500).json({ message: error?.message });
    }
  }

  async isExist(_id: string) {
    try {
      const data = await User.findById(_id);
      if (!data) {
        throw { message: 'User does not exist!' };
      }
    } catch (error: any) {
      throw error;
    }
  }
}

export default new UserService();
