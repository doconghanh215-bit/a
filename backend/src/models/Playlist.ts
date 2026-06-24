import { dbQuery, dbQueryOne } from '../utils/database';
import { generateId } from '../utils/generator';
import { Playlist } from '../types';

export class PlaylistModel {
  static async create(playlistData: Partial<Playlist>): Promise<Playlist> {
    const id = generateId();
    const result = await dbQueryOne(
      `INSERT INTO playlists (id, user_id, title, description, visibility, song_count, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())
       RETURNING *`,
      [id, playlistData.user_id, playlistData.title, playlistData.description, playlistData.visibility || 'private', 0]
    );
    return result;
  }

  static async findById(id: string): Promise<Playlist | null> {
    return dbQueryOne('SELECT * FROM playlists WHERE id = $1', [id]);
  }

  static async findByUserId(userId: string, limit: number = 20, offset: number = 0): Promise<Playlist[]> {
    return dbQuery('SELECT * FROM playlists WHERE user_id = $1 ORDER BY created_at DESC LIMIT $2 OFFSET $3', [userId, limit, offset]);
  }

  static async update(id: string, playlistData: Partial<Playlist>): Promise<Playlist> {
    const fields = [];
    const values = [];
    let paramIndex = 1;

    Object.entries(playlistData).forEach(([key, value]) => {
      if (key !== 'id' && key !== 'created_at') {
        fields.push(`${key} = $${paramIndex}`);
        values.push(value);
        paramIndex++;
      }
    });

    values.push(id);
    const result = await dbQueryOne(
      `UPDATE playlists SET ${fields.join(', ')}, updated_at = NOW() WHERE id = $${paramIndex} RETURNING *`,
      values
    );
    return result;
  }

  static async addSong(playlistId: string, songId: string): Promise<void> {
    const id = generateId();
    await dbQuery(
      `INSERT INTO playlist_songs (id, playlist_id, song_id, created_at)
       VALUES ($1, $2, $3, NOW())`,
      [id, playlistId, songId]
    );
    // Update song count
    await dbQuery(
      `UPDATE playlists SET song_count = song_count + 1 WHERE id = $1`,
      [playlistId]
    );
  }

  static async removeSong(playlistId: string, songId: string): Promise<void> {
    await dbQuery('DELETE FROM playlist_songs WHERE playlist_id = $1 AND song_id = $2', [playlistId, songId]);
    // Update song count
    await dbQuery(
      `UPDATE playlists SET song_count = song_count - 1 WHERE id = $1`,
      [playlistId]
    );
  }

  static async getSongs(playlistId: string, limit: number = 20, offset: number = 0): Promise<any[]> {
    return dbQuery(
      `SELECT s.* FROM songs s
       INNER JOIN playlist_songs ps ON s.id = ps.song_id
       WHERE ps.playlist_id = $1
       ORDER BY ps.created_at DESC
       LIMIT $2 OFFSET $3`,
      [playlistId, limit, offset]
    );
  }

  static async delete(id: string): Promise<void> {
    await dbQuery('DELETE FROM playlist_songs WHERE playlist_id = $1', [id]);
    await dbQuery('DELETE FROM playlists WHERE id = $1', [id]);
  }
}
