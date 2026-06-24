import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import {
  playSong,
  pauseSong,
  togglePlayPause,
  setQueue,
  nextSong,
  previousSong,
  setVolume,
} from '../store/playerSlice';

export const usePlayer = () => {
  const dispatch = useDispatch<AppDispatch>();
  const player = useSelector((state: RootState) => state.player);

  return {
    ...player,
    playSong: (song: any) => dispatch(playSong(song)),
    pauseSong: () => dispatch(pauseSong()),
    togglePlayPause: () => dispatch(togglePlayPause()),
    setQueue: (songs: any[]) => dispatch(setQueue(songs)),
    nextSong: () => dispatch(nextSong()),
    previousSong: () => dispatch(previousSong()),
    setVolume: (volume: number) => dispatch(setVolume(volume)),
  };
};
