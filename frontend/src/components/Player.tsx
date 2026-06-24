import React from 'react';
import { FiPlay, FiPause, FiSkipBack, FiSkipForward, FiVolume2 } from 'react-icons/fi';

interface Song {
  id: string;
  title: string;
  artist: string;
  duration: number;
}

export const Player: React.FC = () => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [volume, setVolume] = React.useState(70);

  return (
    <div className="music-player p-4 flex items-center justify-between">
      <div className="flex items-center gap-4 flex-1">
        <img
          src="/placeholder-album.jpg"
          alt="Album"
          className="w-12 h-12 rounded"
        />
        <div>
          <p className="font-semibold">Song Title</p>
          <p className="text-sm text-gray-400">Artist Name</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 hover:text-primary transition">
          <FiSkipBack size={20} />
        </button>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="p-3 bg-primary rounded-full hover:bg-green-600 transition"
        >
          {isPlaying ? <FiPause size={20} /> : <FiPlay size={20} />}
        </button>
        <button className="p-2 hover:text-primary transition">
          <FiSkipForward size={20} />
        </button>
      </div>

      <div className="flex items-center gap-2 flex-1 justify-end">
        <FiVolume2 size={20} />
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={(e) => setVolume(parseInt(e.target.value))}
          className="w-24 accent-primary"
        />
      </div>
    </div>
  );
};
