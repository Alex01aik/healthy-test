import express, { Request, Response } from 'express';
import userService from './service';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  try {
    const saved = await userService.createOne(req.body);
    res.status(200).json(saved);
  } catch (error: any) {
    res.status(400).json({ message: error?.message });
  }
});

router.get('/all', async (req: Request, res: Response) => {
  try {
    const data = await userService.getAll();
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ message: error?.message });
  }
});

export default router;
