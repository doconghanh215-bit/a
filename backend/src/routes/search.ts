import { Router, Request, Response } from 'express';
import { SongModel } from '../models/Song';
import { AppError } from '../middleware/errorHandler';

const router = Router();

// Search Songs
router.get('/', async (req: Request, res: Response) => {
  const { q, limit = 20, offset = 0 } = req.query;

  if (!q) {
    throw new AppError('Search query required', 400);
  }

  const songs = await SongModel.search(q as string, parseInt(limit as string), parseInt(offset as string));

  res.json({
    success: true,
    data: songs
  });
});

export default router;
