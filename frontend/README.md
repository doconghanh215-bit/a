# Frontend - Next.js Music Streaming

Modern React frontend for music streaming application built with Next.js and Tailwind CSS.

## Features

- ✅ Next.js 14 with App Router
- ✅ TypeScript Support
- ✅ Tailwind CSS Styling
- ✅ Redux State Management
- ✅ Real-time Updates (Socket.io)
- ✅ Responsive Design
- ✅ Music Player Controls
- ✅ Playlist Management
- ✅ Search Functionality
- ✅ Authentication
- ✅ Dark Mode
- ✅ PWA Ready

## Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   ├── auth/
│   │   ├── player/
│   │   ├── library/
│   │   ├── search/
│   │   └── settings/
│   ├── components/
│   │   ├── Player.tsx
│   │   ├── Sidebar.tsx
│   │   ├── Header.tsx
│   │   ├── Playlist.tsx
│   │   └── ...
│   ├── hooks/
│   │   ├── usePlayer.ts
│   │   ├── useAuth.ts
│   │   └── ...
│   ├── lib/
│   │   ├── api.ts
│   │   ├── socket.ts
│   │   └── ...
│   ├── store/
│   │   ├── playerSlice.ts
│   │   ├── authSlice.ts
│   │   └── ...
│   ├── types/
│   │   └── index.ts
│   └── utils/
│       └── ...
├── public/
├── package.json
├── tailwind.config.ts
├── next.config.js
└── tsconfig.json
```

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Environment Variables

```bash
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_WS_URL=ws://localhost:3001
```

## Key Pages

- `/` - Home page
- `/auth/login` - Login page
- `/auth/register` - Register page
- `/player` - Player page
- `/library` - User library
- `/search` - Search page
- `/settings` - Settings page

## Technologies

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Redux Toolkit
- Socket.io Client
- Framer Motion
- React Icons

## License

MIT
