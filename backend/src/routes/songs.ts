import { Router, Request, Response } from 'express';
import { verifyToken, AuthRequest, isAdmin } from '../middleware/auth';
import { validate } from '../middleware/validation';
import { createSongSchema, updateSongSchema } from '../validators/songValidator';
import { SongModel } from '../models/Song';
import { LikeModel } from '../models/Like';
import { AppError } from '../middleware/errorHandler';
import { uploadMiddleware } from '../middleware/upload';
import { uploadToS3 } from '../config/aws';

const router = Router();

// Get All Songs
router.get('/', async (req: Request, res: Response) => {
  const { limit = 20, offset = 0 } = req.query;

  const songs = await SongModel.getApproved(parseInt(limit as string), parseInt(offset as string));

  res.json({
    success: true,
    data: songs
  });
});

// Get Song by ID
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  const song = await SongModel.findById(id);
  if (!song) {
    throw new AppError('Song not found', 404);
  }

  // Increment play count
  await SongModel.incrementPlayCount(id);

  res.json({
    success: true,
    data: song
  });
});

// Upload Song
router.post('/', verifyToken, uploadMiddleware.fields([{ name: 'audio' }, { name: 'cover' }]), validate(createSongSchema), async (req: AuthRequest, res: Response) => {
  const { title, genre, duration, releaseYear, description } = req.body;

  if (!req.files?.audio) {
    throw new AppError('Audio file required', 400);
  }

  // Upload audio and cover
  const audioUrl = await uploadToS3(req.files.audio[0], 'songs');
  const coverUrl = req.files.cover ? await uploadToS3(req.files.cover[0], 'covers') : undefined;

  const song = await SongModel.create({
    title,
    artist_id: req.user!.id,
    genre,
    duration,
    release_year: releaseYear,
    description,
    file_url: audioUrl,
    cover_url: coverUrl,
    status: 'pending'
  });

  res.status(201).json({
    success: true,
    message: 'Song uploaded successfully',
    data: song
  });
});

// Update Song
router.put('/:id', verifyToken, validate(updateSongSchema), async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { title, genre, description, releaseYear } = req.body;

  const song = await SongModel.findById(id);
  if (!song) {
    throw new AppError('Song not found', 404);
  }

  if (song.artist_id !== req.user?.id && req.user?.role !== 'admin') {
    throw new AppError('Unauthorized', 403);
  }

  const updatedSong = await SongModel.update(id, {
    title,
    genre,
    description,
    release_year: releaseYear
  } as any);

  res.json({
    success: true,
    message: 'Song updated',
    data: updatedSong
  });
});

// Like Song
router.post('/:id/like', verifyToken, async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  const song = await SongModel.findById(id);
  if (!song) {
    throw new AppError('Song not found', 404);
  }

  await LikeModel.add(req.user!.id, id);

  res.json({
    success: true,
    message: 'Song liked'
  });
});

// Unlike Song
router.delete('/:id/like', verifyToken, async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  await LikeModel.remove(req.user!.id, id);

  res.json({
    success: true,
    message: 'Song unliked'
  });
});

// Delete Song
router.delete('/:id', verifyToken, async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  const song = await SongModel.findById(id);
  if (!song) {
    throw new AppError('Song not found', 404);
  }

  if (song.artist_id !== req.user?.id && req.user?.role !== 'admin') {
    throw new AppError('Unauthorized', 403);
  }

  await SongModel.delete(id);

  res.json({
    success: true,
    message: 'Song deleted'
  });
});

export default router;
