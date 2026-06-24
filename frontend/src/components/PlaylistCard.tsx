import React from 'react';
import { FiPlay, FiHeart, FiMoreVertical } from 'react-icons/fi';

interface PlaylistProps {
  id: string;
  name: string;
  image?: string;
  songCount: number;
  duration?: string;
}

export const PlaylistCard: React.FC<PlaylistProps> = ({
  id,
  name,
  image,
  songCount,
  duration
}) => {
  return (
    <div className="card group cursor-pointer">
      <div className="relative mb-4 overflow-hidden rounded-lg">
        <img
          src={image || '/placeholder-playlist.jpg'}
          alt={name}
          className="w-full aspect-square object-cover group-hover:scale-110 transition"
        />
        <button className="absolute bottom-2 right-2 p-2 bg-primary rounded-full opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition">
          <FiPlay className="fill-current" />
        </button>
      </div>
      <h3 className="font-semibold truncate">{name}</h3>
      <p className="text-sm text-gray-400">{songCount} songs</p>
      {duration && <p className="text-xs text-gray-500">{duration}</p>}
    </div>
  );
};
