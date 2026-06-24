import { dbQuery, dbQueryOne } from '../utils/database';
import { generateId } from '../utils/generator';
import { Song } from '../types';

export class SongModel {
  static async create(songData: Partial<Song>): Promise<Song> {
    const id = generateId();
    const result = await dbQueryOne(
      `INSERT INTO songs (id, title, artist_id, album_id, duration, file_url, cover_url, genre, release_year, description, status, play_count, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, NOW(), NOW())
       RETURNING *`,
      [id, songData.title, songData.artist_id, songData.album_id, songData.duration, songData.file_url, songData.cover_url, songData.genre, songData.release_year, songData.description, songData.status || 'pending', 0]
    );
    return result;
  }

  static async findById(id: string): Promise<Song | null> {
    return dbQueryOne('SELECT * FROM songs WHERE id = $1', [id]);
  }

  static async findByArtistId(artistId: string, limit: number = 20, offset: number = 0): Promise<Song[]> {
    return dbQuery('SELECT * FROM songs WHERE artist_id = $1 ORDER BY created_at DESC LIMIT $2 OFFSET $3', [artistId, limit, offset]);
  }

  static async getApproved(limit: number = 20, offset: number = 0): Promise<Song[]> {
    return dbQuery('SELECT * FROM songs WHERE status = $1 ORDER BY play_count DESC, created_at DESC LIMIT $2 OFFSET $3', ['approved', limit, offset]);
  }

  static async getPending(limit: number = 20, offset: number = 0): Promise<Song[]> {
    return dbQuery('SELECT * FROM songs WHERE status = $1 ORDER BY created_at ASC LIMIT $2 OFFSET $3', ['pending', limit, offset]);
  }

  static async update(id: string, songData: Partial<Song>): Promise<Song> {
    const fields = [];
    const values = [];
    let paramIndex = 1;

    Object.entries(songData).forEach(([key, value]) => {
      if (key !== 'id' && key !== 'created_at') {
        fields.push(`${key} = $${paramIndex}`);
        values.push(value);
        paramIndex++;
      }
    });

    values.push(id);
    const result = await dbQueryOne(
      `UPDATE songs SET ${fields.join(', ')}, updated_at = NOW() WHERE id = $${paramIndex} RETURNING *`,
      values
    );
    return result;
  }

  static async incrementPlayCount(id: string): Promise<void> {
    await dbQuery('UPDATE songs SET play_count = play_count + 1 WHERE id = $1', [id]);
  }

  static async delete(id: string): Promise<void> {
    await dbQuery('DELETE FROM songs WHERE id = $1', [id]);
  }

  static async search(query: string, limit: number = 20, offset: number = 0): Promise<Song[]> {
    return dbQuery(
      `SELECT * FROM songs WHERE status = 'approved' AND (title ILIKE $1 OR genre ILIKE $1) ORDER BY play_count DESC LIMIT $2 OFFSET $3`,
      [`%${query}%`, limit, offset]
    );
  }
}
