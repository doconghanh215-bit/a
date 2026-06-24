import { Router, Request, Response } from 'express';
import { verifyToken, AuthRequest, isAdmin } from '../middleware/auth';
import { validate } from '../middleware/validation';
import { updateProfileSchema } from '../validators/authValidator';
import { UserModel } from '../models/User';
import { LikeModel } from '../models/Like';
import { AppError } from '../middleware/errorHandler';
import { uploadMiddleware } from '../middleware/upload';
import { uploadToS3 } from '../config/aws';

const router = Router();

// Get User Profile
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await UserModel.findById(id);
  if (!user) {
    throw new AppError('User not found', 404);
  }

  res.json({
    success: true,
    data: {
      id: user.id,
      email: user.email,
      username: user.username,
      firstName: user.first_name,
      lastName: user.last_name,
      avatar: user.avatar_url,
      bio: user.bio,
      role: user.role
    }
  });
});

// Update User Profile
router.put('/:id', verifyToken, validate(updateProfileSchema), async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { firstName, lastName, bio } = req.body;

  if (req.user?.id !== id && req.user?.role !== 'admin') {
    throw new AppError('Unauthorized', 403);
  }

  const updatedUser = await UserModel.update(id, {
    first_name: firstName,
    last_name: lastName,
    bio
  } as any);

  res.json({
    success: true,
    message: 'Profile updated',
    data: updatedUser
  });
});

// Upload Avatar
router.post('/:id/avatar', verifyToken, uploadMiddleware.single('avatar'), async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  if (req.user?.id !== id) {
    throw new AppError('Unauthorized', 403);
  }

  if (!req.file) {
    throw new AppError('No file uploaded', 400);
  }

  // Upload to S3 or local storage
  const avatarUrl = await uploadToS3(req.file, 'avatars');

  await UserModel.update(id, { avatar_url: avatarUrl } as any);

  res.json({
    success: true,
    message: 'Avatar uploaded',
    data: { avatarUrl }
  });
});

// Get User Liked Songs
router.get('/:id/likes', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { limit = 20, offset = 0 } = req.query;

  const songs = await LikeModel.getUserLikes(id, parseInt(limit as string), parseInt(offset as string));

  res.json({
    success: true,
    data: songs
  });
});

export default router;
