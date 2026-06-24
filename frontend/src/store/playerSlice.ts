import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Song {
  id: string;
  title: string;
  artist: string;
  duration: number;
  url: string;
}

interface PlayerState {
  currentSong: Song | null;
  queue: Song[];
  isPlaying: boolean;
  currentTime: number;
  volume: number;
  isMuted: boolean;
}

const initialState: PlayerState = {
  currentSong: null,
  queue: [],
  isPlaying: false,
  currentTime: 0,
  volume: 70,
  isMuted: false,
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    playSong: (state, action: PayloadAction<Song>) => {
      state.currentSong = action.payload;
      state.isPlaying = true;
    },
    pauseSong: (state) => {
      state.isPlaying = false;
    },
    togglePlayPause: (state) => {
      state.isPlaying = !state.isPlaying;
    },
    setQueue: (state, action: PayloadAction<Song[]>) => {
      state.queue = action.payload;
    },
    setCurrentTime: (state, action: PayloadAction<number>) => {
      state.currentTime = action.payload;
    },
    setVolume: (state, action: PayloadAction<number>) => {
      state.volume = action.payload;
    },
    setMuted: (state, action: PayloadAction<boolean>) => {
      state.isMuted = action.payload;
    },
    nextSong: (state) => {
      if (state.currentSong && state.queue.length > 0) {
        const currentIndex = state.queue.findIndex(
          (s) => s.id === state.currentSong?.id
        );
        if (currentIndex < state.queue.length - 1) {
          state.currentSong = state.queue[currentIndex + 1];
        }
      }
    },
    previousSong: (state) => {
      if (state.currentSong && state.queue.length > 0) {
        const currentIndex = state.queue.findIndex(
          (s) => s.id === state.currentSong?.id
        );
        if (currentIndex > 0) {
          state.currentSong = state.queue[currentIndex - 1];
        }
      }
    },
  },
});

export const {
  playSong,
  pauseSong,
  togglePlayPause,
  setQueue,
  setCurrentTime,
  setVolume,
  setMuted,
  nextSong,
  previousSong,
} = playerSlice.actions;

export default playerSlice.reducer;
