export interface User {
  id: string;
  email: string;
  username: string;
  password_hash: string;
  first_name: string;
  last_name: string;
  avatar_url?: string;
  bio?: string;
  role: 'user' | 'artist' | 'admin';
  is_verified: boolean;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface Song {
  id: string;
  title: string;
  artist_id: string;
  album_id?: string;
  duration: number;
  file_url: string;
  cover_url?: string;
  genre: string;
  release_year?: number;
  description?: string;
  status: 'pending' | 'approved' | 'rejected';
  play_count: number;
  created_at: Date;
  updated_at: Date;
}

export interface Album {
  id: string;
  title: string;
  artist_id: string;
  cover_url?: string;
  description?: string;
  release_date: Date;
  created_at: Date;
  updated_at: Date;
}

export interface Playlist {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  cover_url?: string;
  visibility: 'public' | 'private' | 'collaborative';
  song_count: number;
  created_at: Date;
  updated_at: Date;
}

export interface Artist {
  id: string;
  user_id: string;
  bio?: string;
  followers_count: number;
  verified: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface Podcast {
  id: string;
  title: string;
  creator_id: string;
  description?: string;
  cover_url?: string;
  episode_count: number;
  created_at: Date;
  updated_at: Date;
}

export interface Video {
  id: string;
  title: string;
  artist_id: string;
  video_url: string;
  thumbnail_url?: string;
  duration: number;
  created_at: Date;
  updated_at: Date;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  timestamp: Date;
}
