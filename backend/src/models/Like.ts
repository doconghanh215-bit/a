import { dbQuery, dbQueryOne } from '../utils/database';
import { generateId } from '../utils/generator';

export class LikeModel {
  static async add(userId: string, songId: string): Promise<void> {
    const id = generateId();
    await dbQuery(
      `INSERT INTO likes (id, user_id, song_id, created_at)
       VALUES ($1, $2, $3, NOW())
       ON CONFLICT (user_id, song_id) DO NOTHING`,
      [id, userId, songId]
    );
  }

  static async remove(userId: string, songId: string): Promise<void> {
    await dbQuery('DELETE FROM likes WHERE user_id = $1 AND song_id = $2', [userId, songId]);
  }

  static async isLiked(userId: string, songId: string): Promise<boolean> {
    const result = await dbQueryOne('SELECT id FROM likes WHERE user_id = $1 AND song_id = $2', [userId, songId]);
    return result !== null;
  }

  static async getUserLikes(userId: string, limit: number = 20, offset: number = 0): Promise<any[]> {
    return dbQuery(
      `SELECT s.* FROM songs s
       INNER JOIN likes l ON s.id = l.song_id
       WHERE l.user_id = $1
       ORDER BY l.created_at DESC
       LIMIT $2 OFFSET $3`,
      [userId, limit, offset]
    );
  }

  static async getLikesCount(songId: string): Promise<number> {
    const result = await dbQueryOne('SELECT COUNT(*) as count FROM likes WHERE song_id = $1', [songId]);
    return result?.count || 0;
  }
}
