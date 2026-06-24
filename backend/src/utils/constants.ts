export const PAGINATION_LIMIT = parseInt(process.env.PAGINATION_LIMIT || '20');
export const SEARCH_LIMIT = parseInt(process.env.SEARCH_LIMIT || '50');
export const CACHE_TTL = parseInt(process.env.CACHE_TTL || '3600');

export const ALLOWED_AUDIO_FORMATS = process.env.ALLOWED_AUDIO_FORMATS?.split(',') || ['mp3', 'wav', 'flac', 'aac'];
export const ALLOWED_IMAGE_FORMATS = process.env.ALLOWED_IMAGE_FORMATS?.split(',') || ['jpg', 'jpeg', 'png', 'webp'];

export const USER_ROLES = {
  USER: 'user',
  ARTIST: 'artist',
  ADMIN: 'admin'
};

export const SONG_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected'
};

export const PLAYLIST_VISIBILITY = {
  PUBLIC: 'public',
  PRIVATE: 'private',
  COLLABORATIVE: 'collaborative'
};

export const ERROR_MESSAGES = {
  UNAUTHORIZED: 'Unauthorized access',
  FORBIDDEN: 'Forbidden access',
  NOT_FOUND: 'Resource not found',
  INVALID_INPUT: 'Invalid input',
  SERVER_ERROR: 'Internal server error'
};
