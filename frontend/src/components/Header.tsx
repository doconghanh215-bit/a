import React from 'react';
import { FiSearch, FiUser } from 'react-icons/fi';

export const Header: React.FC = () => {
  return (
    <header className="bg-accent border-b border-gray-700 p-4 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center gap-2 bg-secondary rounded-full px-4 py-2 flex-1 max-w-sm">
        <FiSearch />
        <input
          type="text"
          placeholder="Search songs, artists, albums..."
          className="bg-transparent outline-none flex-1"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="px-6 py-2 border border-white rounded-full hover:scale-105 transition">
          Sign up
        </button>
        <button className="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-green-600 transition">
          <FiUser />
        </button>
      </div>
    </header>
  );
};
