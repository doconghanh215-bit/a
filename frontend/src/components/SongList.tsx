import React from 'react';
import { FiPlay, FiPause, FiTrash2, FiEdit2 } from 'react-icons/fi';

interface SongListProps {
  songs: any[];
  isPlaying?: boolean;
  currentSongId?: string;
  onPlay?: (songId: string) => void;
  onDelete?: (songId: string) => void;
}

export const SongList: React.FC<SongListProps> = ({
  songs,
  isPlaying,
  currentSongId,
  onPlay,
  onDelete
}) => {
  return (
    <div className="space-y-2">
      {songs.map((song, index) => (
        <div
          key={song.id}
          className="flex items-center gap-4 p-3 rounded-lg hover:bg-accent transition group"
        >
          <span className="text-gray-400 w-6 text-right">{index + 1}</span>
          <button
            onClick={() => onPlay?.(song.id)}
            className="p-1 opacity-0 group-hover:opacity-100 transition"
          >
            {currentSongId === song.id && isPlaying ? (
              <FiPause size={18} />
            ) : (
              <FiPlay size={18} />
            )}
          </button>
          <div className="flex-1 min-w-0">
            <p className="font-semibold truncate">{song.title}</p>
            <p className="text-sm text-gray-400 truncate">{song.artist}</p>
          </div>
          <span className="text-gray-400 text-sm">{song.duration}</span>
          <button
            onClick={() => onDelete?.(song.id)}
            className="p-1 opacity-0 group-hover:opacity-100 transition hover:text-red-500"
          >
            <FiTrash2 size={18} />
          </button>
        </div>
      ))}
    </div>
  );
};
