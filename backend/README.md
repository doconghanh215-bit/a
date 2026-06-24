# Backend - Express.js Music Streaming Server

A robust Express.js backend server for music streaming application with advanced features.

## Features

- ✅ RESTful API with Express.js
- ✅ PostgreSQL Database
- ✅ Redis Caching
- ✅ JWT Authentication
- ✅ WebSocket Support (Socket.io)
- ✅ File Upload (AWS S3 or Local)
- ✅ Email Notifications
- ✅ Social OAuth (Google, Facebook)
- ✅ Audio Processing (FFmpeg)
- ✅ Rate Limiting & Security
- ✅ Swagger API Documentation

## Project Structure

```
backend/
├── src/
│   ├── index.ts                 # Entry point
│   ├── app.ts                   # Express app setup
│   ├── config/
│   │   ├── database.ts          # Database connection
│   │   ├── redis.ts             # Redis connection
│   │   ├── aws.ts               # AWS S3 config
│   │   └── email.ts             # Email config
│   ├── routes/
│   │   ├── auth.ts              # Authentication routes
│   │   ├── users.ts             # User routes
│   │   ├── songs.ts             # Song routes
│   │   ├── playlists.ts         # Playlist routes
│   │   ├── search.ts            # Search routes
│   │   ├── recommendations.ts   # Recommendation routes
│   │   ├── social.ts            # Social features routes
│   │   ├── admin.ts             # Admin routes
│   │   └── index.ts             # Routes aggregator
│   ├── controllers/
│   │   ├── authController.ts
│   │   ├── userController.ts
│   │   ├── songController.ts
│   │   ├── playlistController.ts
│   │   ├── searchController.ts
│   │   ├── recommendationController.ts
│   │   ├── socialController.ts
│   │   └── adminController.ts
│   ├── models/
│   │   ├── User.ts
│   │   ├── Song.ts
│   │   ├── Album.ts
│   │   ├── Artist.ts
│   │   ├── Playlist.ts
│   │   ├── Podcast.ts
│   │   └── Video.ts
│   ├── services/
│   │   ├── authService.ts
│   │   ├── userService.ts
│   │   ├── songService.ts
│   │   ├── playlistService.ts
│   │   ├── searchService.ts
│   │   ├── recommendationService.ts
│   │   ├── emailService.ts
│   │   ├── fileUploadService.ts
│   │   ├── audioProcessingService.ts
│   │   └── socialService.ts
│   ├── middleware/
│   │   ├── auth.ts              # JWT middleware
│   │   ├── errorHandler.ts      # Error handling
│   │   ├── validation.ts        # Input validation
│   │   ├── upload.ts            # File upload middleware
│   │   └── logger.ts            # Logging middleware
│   ├── validators/
│   │   ├── authValidator.ts
│   │   ├── userValidator.ts
│   │   ├── songValidator.ts
│   │   └── playlistValidator.ts
│   ├── websocket/
│   │   ├── handlers.ts          # WebSocket event handlers
│   │   ├── events.ts            # Event definitions
│   │   └── rooms.ts             # Room management
│   ├── utils/
│   │   ├── database.ts          # Database utilities
│   │   ├── cache.ts             # Caching utilities
│   │   ├── jwt.ts               # JWT utilities
│   │   ├── email.ts             # Email utilities
│   │   ├── file.ts              # File utilities
│   │   ├── constants.ts         # Constants
│   │   └── logger.ts            # Logger setup
│   ├── types/
│   │   ├── index.ts             # TypeScript types
│   │   └── express.ts           # Express extensions
│   └── database/
│       ├── migrations.ts        # Database migrations
│       ├── seeds.ts             # Database seeds
│       └── schema.sql           # Initial schema
├── package.json
├── tsconfig.json
├── Dockerfile
└── README.md
```

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- Redis 6+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Setup environment
cp .env.example .env

# Run migrations
npm run migrate

# Seed database
npm run seed

# Start development server
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh` - Refresh JWT token
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password
- `POST /api/auth/google` - Google OAuth
- `POST /api/auth/facebook` - Facebook OAuth

### Users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile
- `POST /api/users/:id/avatar` - Upload avatar
- `GET /api/users/:id/stats` - Get user statistics
- `GET /api/users/:id/playlists` - Get user playlists
- `GET /api/users/:id/followers` - Get followers
- `POST /api/users/:id/follow` - Follow user
- `DELETE /api/users/:id/follow` - Unfollow user

### Songs
- `GET /api/songs` - List all songs
- `GET /api/songs/:id` - Get song details
- `POST /api/songs` - Upload song
- `PUT /api/songs/:id` - Update song
- `DELETE /api/songs/:id` - Delete song
- `POST /api/songs/:id/like` - Like song
- `DELETE /api/songs/:id/like` - Unlike song
- `GET /api/songs/:id/lyrics` - Get lyrics
- `GET /api/songs/:id/comments` - Get comments
- `POST /api/songs/:id/comments` - Add comment

### Playlists
- `GET /api/playlists` - List playlists
- `POST /api/playlists` - Create playlist
- `GET /api/playlists/:id` - Get playlist details
- `PUT /api/playlists/:id` - Update playlist
- `DELETE /api/playlists/:id` - Delete playlist
- `POST /api/playlists/:id/songs` - Add song to playlist
- `DELETE /api/playlists/:id/songs/:songId` - Remove song
- `GET /api/playlists/:id/collaborators` - Get collaborators
- `POST /api/playlists/:id/collaborators` - Add collaborator

### Search & Discovery
- `GET /api/search` - Search songs, artists, albums
- `GET /api/charts` - Get charts
- `GET /api/recommendations` - Get recommendations
- `GET /api/recommendations/discover-weekly` - Discover Weekly
- `GET /api/browse` - Browse by category
- `GET /api/radio/:type` - Get radio stations

### Admin
- `GET /api/admin/users` - List users
- `GET /api/admin/songs/pending` - Get pending songs
- `POST /api/admin/songs/:id/approve` - Approve song
- `POST /api/admin/songs/:id/reject` - Reject song
- `GET /api/admin/analytics` - Get analytics
- `GET /api/admin/reports` - Get user reports

## Environment Variables

See `.env.example` for complete list.

## WebSocket Events

- `player:play` - Start playing
- `player:pause` - Pause playback
- `player:seek` - Seek to position
- `player:next` - Play next song
- `player:prev` - Play previous song
- `queue:update` - Queue updated
- `notification:new` - New notification
- `status:online` - User online
- `status:offline` - User offline
- `playlist:update` - Playlist updated (collaborative)

## Development

```bash
# Run linting
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Run tests
npm run test

# Run tests in watch mode
npm run test:watch

# Build for production
npm run build

# Start production server
npm start
```

## Testing

Tests are located in `src/**/__tests__` directories.

```bash
npm run test
```

## Docker

```bash
# Build image
docker build -t music-streaming-backend .

# Run container
docker run -p 3001:3001 --env-file .env music-streaming-backend
```

## Deployment

### Heroku
```bash
heroku login
heroku create music-streaming-backend
git push heroku main
```

### Railway
```bash
npm install -g railway
railway init
railway up
```

## API Documentation

Access Swagger API documentation at `/api/docs` when the server is running.

## License

MIT
