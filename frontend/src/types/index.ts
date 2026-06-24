// To-Do List Application Types
export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  category?: string;
  tags?: string[];
}

export interface TodoFilter {
  status: 'all' | 'active' | 'completed';
  priority?: 'low' | 'medium' | 'high';
  category?: string;
  searchQuery?: string;
}

// Music Streaming Types
export interface Song {
  id: string;
  title: string;
  artist: string;
  album?: string;
  duration: number;
  cover?: string;
  genre?: string;
  releaseYear?: number;
}

export interface Playlist {
  id: string;
  name: string;
  description?: string;
  image?: string;
  songs: Song[];
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  bio?: string;
  role: 'user' | 'artist' | 'admin';
}
