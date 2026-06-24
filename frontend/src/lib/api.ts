import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  register: (data: any) => api.post('/auth/register', data),
  login: (data: any) => api.post('/auth/login', data),
  logout: () => api.post('/auth/logout'),
};

// Songs API
export const songsAPI = {
  getAll: (limit = 20, offset = 0) =>
    api.get('/songs', { params: { limit, offset } }),
  getById: (id: string) => api.get(`/songs/${id}`),
  create: (data: FormData) => api.post('/songs', data),
  update: (id: string, data: any) => api.put(`/songs/${id}`, data),
  delete: (id: string) => api.delete(`/songs/${id}`),
  like: (id: string) => api.post(`/songs/${id}/like`),
  unlike: (id: string) => api.delete(`/songs/${id}/like`),
  search: (query: string, limit = 20) =>
    api.get('/search', { params: { q: query, limit } }),
};

// Playlists API
export const playlistsAPI = {
  getAll: (limit = 20, offset = 0) =>
    api.get('/playlists', { params: { limit, offset } }),
  getById: (id: string) => api.get(`/playlists/${id}`),
  create: (data: any) => api.post('/playlists', data),
  update: (id: string, data: any) => api.put(`/playlists/${id}`, data),
  delete: (id: string) => api.delete(`/playlists/${id}`),
  addSong: (id: string, songId: string) =>
    api.post(`/playlists/${id}/songs`, { songId }),
  removeSong: (id: string, songId: string) =>
    api.delete(`/playlists/${id}/songs/${songId}`),
  getSongs: (id: string, limit = 20, offset = 0) =>
    api.get(`/playlists/${id}/songs`, { params: { limit, offset } }),
};

// Users API
export const usersAPI = {
  getProfile: (id: string) => api.get(`/users/${id}`),
  updateProfile: (id: string, data: any) => api.put(`/users/${id}`, data),
  uploadAvatar: (id: string, file: File) => {
    const formData = new FormData();
    formData.append('avatar', file);
    return api.post(`/users/${id}/avatar`, formData);
  },
  getLikes: (id: string, limit = 20) =>
    api.get(`/users/${id}/likes`, { params: { limit } }),
};

// Admin API
export const adminAPI = {
  getPendingSongs: (limit = 20, offset = 0) =>
    api.get('/admin/songs/pending', { params: { limit, offset } }),
  approveSong: (id: string) => api.post(`/admin/songs/${id}/approve`),
  rejectSong: (id: string, reason: string) =>
    api.post(`/admin/songs/${id}/reject`, { reason }),
};

export default api;
