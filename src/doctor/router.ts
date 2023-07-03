import express, { Request, Response } from 'express';
import doctorService from './service';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  await doctorService.createOne(req, res);
});

router.get('/all', async (req: Request, res: Response) => {
  await doctorService.getAll(req, res);
});

export default router;
