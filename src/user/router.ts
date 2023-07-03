import express, { Request, Response } from 'express';
import userService from './service';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  await userService.createOne(req, res);
});

router.get('/all', async (req: Request, res: Response) => {
  await userService.getAll(req, res);
});

export default router;
