import React from 'react';
import Link from 'next/link';
import { FiHome, FiSearch, FiLibrary, FiPlus, FiHeart } from 'react-icons/fi';

export const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar w-64 h-screen fixed left-0 top-0 p-6 overflow-y-auto">
      <h1 className="text-2xl font-bold text-primary mb-8">🎵 Spotify</h1>

      <nav className="space-y-4 mb-8">
        <Link
          href="/"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition"
        >
          <FiHome /> Home
        </Link>
        <Link
          href="/search"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition"
        >
          <FiSearch /> Search
        </Link>
        <Link
          href="/library"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition"
        >
          <FiLibrary /> Library
        </Link>
      </nav>

      <div className="border-t border-gray-700 pt-4">
        <button className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-accent transition mb-4">
          <FiPlus /> Create Playlist
        </button>

        <button className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-accent transition">
          <FiHeart /> Liked Songs
        </button>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-4 text-sm text-gray-400 space-y-2">
        <p>Recent Playlists</p>
        <div className="space-y-2">
          <p className="hover:text-white cursor-pointer transition">Workout Mix</p>
          <p className="hover:text-white cursor-pointer transition">Chill Vibes</p>
          <p className="hover:text-white cursor-pointer transition">Study Focus</p>
        </div>
      </div>
    </aside>
  );
};
