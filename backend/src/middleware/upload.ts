import multer from 'multer';
import path from 'path';
import { AppError } from './errorHandler';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, process.env.UPLOAD_PATH || './uploads');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const fileFilter = (req: any, file: any, cb: any) => {
  const allowedAudio = process.env.ALLOWED_AUDIO_FORMATS?.split(',') || ['mp3', 'wav', 'flac', 'aac'];
  const allowedImages = process.env.ALLOWED_IMAGE_FORMATS?.split(',') || ['jpg', 'jpeg', 'png', 'webp'];
  
  const ext = path.extname(file.originalname).substring(1).toLowerCase();
  
  if (allowedAudio.includes(ext) || allowedImages.includes(ext)) {
    cb(null, true);
  } else {
    cb(new AppError('File type not allowed', 400));
  }
};

export const uploadMiddleware = multer({
  storage,
  fileFilter,
  limits: { fileSize: parseInt(process.env.MAX_FILE_SIZE || '100000000') }
});
