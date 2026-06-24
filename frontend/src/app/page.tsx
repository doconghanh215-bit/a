import React from 'react';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-secondary text-white">
      <div className="w-full max-w-5xl">
        <h1 className="text-4xl font-bold mb-8">🎵 Music Streaming App</h1>
        <p className="text-gray-400 mb-8">Welcome to the ultimate music streaming experience</p>
        <button className="px-6 py-3 bg-primary text-white rounded-full font-bold hover:bg-green-600">
          Get Started
        </button>
      </div>
    </main>
  );
}
