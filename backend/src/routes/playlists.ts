import { Router, Request, Response } from 'express';
import { verifyToken, AuthRequest } from '../middleware/auth';
import { validate } from '../middleware/validation';
import { createPlaylistSchema, updatePlaylistSchema, addSongToPlaylistSchema } from '../validators/playlistValidator';
import { PlaylistModel } from '../models/Playlist';
import { AppError } from '../middleware/errorHandler';

const router = Router();

// Get All Playlists
router.get('/', async (req: Request, res: Response) => {
  const { limit = 20, offset = 0 } = req.query;

  // Get public playlists
  const playlists = await PlaylistModel.findByUserId('', parseInt(limit as string), parseInt(offset as string));

  res.json({
    success: true,
    data: playlists
  });
});

// Get Playlist by ID
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  const playlist = await PlaylistModel.findById(id);
  if (!playlist) {
    throw new AppError('Playlist not found', 404);
  }

  res.json({
    success: true,
    data: playlist
  });
});

// Create Playlist
router.post('/', verifyToken, validate(createPlaylistSchema), async (req: AuthRequest, res: Response) => {
  const { title, description, visibility } = req.body;

  const playlist = await PlaylistModel.create({
    user_id: req.user!.id,
    title,
    description,
    visibility
  });

  res.status(201).json({
    success: true,
    message: 'Playlist created',
    data: playlist
  });
});

// Update Playlist
router.put('/:id', verifyToken, validate(updatePlaylistSchema), async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { title, description, visibility } = req.body;

  const playlist = await PlaylistModel.findById(id);
  if (!playlist) {
    throw new AppError('Playlist not found', 404);
  }

  if (playlist.user_id !== req.user?.id) {
    throw new AppError('Unauthorized', 403);
  }

  const updatedPlaylist = await PlaylistModel.update(id, {
    title,
    description,
    visibility
  } as any);

  res.json({
    success: true,
    message: 'Playlist updated',
    data: updatedPlaylist
  });
});

// Add Song to Playlist
router.post('/:id/songs', verifyToken, validate(addSongToPlaylistSchema), async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { songId } = req.body;

  const playlist = await PlaylistModel.findById(id);
  if (!playlist) {
    throw new AppError('Playlist not found', 404);
  }

  if (playlist.user_id !== req.user?.id) {
    throw new AppError('Unauthorized', 403);
  }

  await PlaylistModel.addSong(id, songId);

  res.json({
    success: true,
    message: 'Song added to playlist'
  });
});

// Remove Song from Playlist
router.delete('/:id/songs/:songId', verifyToken, async (req: AuthRequest, res: Response) => {
  const { id, songId } = req.params;

  const playlist = await PlaylistModel.findById(id);
  if (!playlist) {
    throw new AppError('Playlist not found', 404);
  }

  if (playlist.user_id !== req.user?.id) {
    throw new AppError('Unauthorized', 403);
  }

  await PlaylistModel.removeSong(id, songId);

  res.json({
    success: true,
    message: 'Song removed from playlist'
  });
});

// Get Playlist Songs
router.get('/:id/songs', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { limit = 20, offset = 0 } = req.query;

  const songs = await PlaylistModel.getSongs(id, parseInt(limit as string), parseInt(offset as string));

  res.json({
    success: true,
    data: songs
  });
});

// Delete Playlist
router.delete('/:id', verifyToken, async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  const playlist = await PlaylistModel.findById(id);
  if (!playlist) {
    throw new AppError('Playlist not found', 404);
  }

  if (playlist.user_id !== req.user?.id) {
    throw new AppError('Unauthorized', 403);
  }

  await PlaylistModel.delete(id);

  res.json({
    success: true,
    message: 'Playlist deleted'
  });
});

export default router;
