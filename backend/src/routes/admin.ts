import { Router, Request, Response } from 'express';
import { verifyToken, isAdmin, AuthRequest } from '../middleware/auth';
import { SongModel } from '../models/Song';
import { UserModel } from '../models/User';
import { AppError } from '../middleware/errorHandler';

const router = Router();

// Get Admin Dashboard Data
router.get('/dashboard', verifyToken, isAdmin, async (req: AuthRequest, res: Response) => {
  res.json({
    success: true,
    data: {
      totalUsers: 0,
      totalSongs: 0,
      pendingSongs: 0,
      totalPlays: 0
    }
  });
});

// Get Pending Songs
router.get('/songs/pending', verifyToken, isAdmin, async (req: AuthRequest, res: Response) => {
  const { limit = 20, offset = 0 } = req.query;

  const songs = await SongModel.getPending(parseInt(limit as string), parseInt(offset as string));

  res.json({
    success: true,
    data: songs
  });
});

// Approve Song
router.post('/songs/:id/approve', verifyToken, isAdmin, async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  const song = await SongModel.findById(id);
  if (!song) {
    throw new AppError('Song not found', 404);
  }

  await SongModel.update(id, { status: 'approved' } as any);

  res.json({
    success: true,
    message: 'Song approved'
  });
});

// Reject Song
router.post('/songs/:id/reject', verifyToken, isAdmin, async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { reason } = req.body;

  const song = await SongModel.findById(id);
  if (!song) {
    throw new AppError('Song not found', 404);
  }

  await SongModel.update(id, { status: 'rejected' } as any);

  res.json({
    success: true,
    message: 'Song rejected'
  });
});

// Get All Users
router.get('/users', verifyToken, isAdmin, async (req: AuthRequest, res: Response) => {
  const { limit = 20, offset = 0 } = req.query;

  const users = await UserModel.getAll(parseInt(limit as string), parseInt(offset as string));

  res.json({
    success: true,
    data: users
  });
});

export default router;
