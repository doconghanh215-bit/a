import { Router } from 'express';
import authRoutes from './auth';
import userRoutes from './users';
import songRoutes from './songs';
import playlistRoutes from './playlists';
import searchRoutes from './search';
import adminRoutes from './admin';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/songs', songRoutes);
router.use('/playlists', playlistRoutes);
router.use('/search', searchRoutes);
router.use('/admin', adminRoutes);

export default router;
