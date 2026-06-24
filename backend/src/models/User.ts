import { dbQuery, dbQueryOne } from '../utils/database';
import { generateId } from '../utils/generator';
import { User } from '../types';

export class UserModel {
  static async create(userData: Partial<User>): Promise<User> {
    const id = generateId();
    const result = await dbQueryOne(
      `INSERT INTO users (id, email, username, password_hash, first_name, last_name, role, is_verified, is_active, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), NOW())
       RETURNING *`,
      [id, userData.email, userData.username, userData.password_hash, userData.first_name, userData.last_name, userData.role || 'user', false, true]
    );
    return result;
  }

  static async findById(id: string): Promise<User | null> {
    return dbQueryOne('SELECT * FROM users WHERE id = $1', [id]);
  }

  static async findByEmail(email: string): Promise<User | null> {
    return dbQueryOne('SELECT * FROM users WHERE email = $1', [email]);
  }

  static async findByUsername(username: string): Promise<User | null> {
    return dbQueryOne('SELECT * FROM users WHERE username = $1', [username]);
  }

  static async update(id: string, userData: Partial<User>): Promise<User> {
    const fields = [];
    const values = [];
    let paramIndex = 1;

    Object.entries(userData).forEach(([key, value]) => {
      if (key !== 'id' && key !== 'created_at') {
        fields.push(`${key} = $${paramIndex}`);
        values.push(value);
        paramIndex++;
      }
    });

    values.push(id);
    const result = await dbQueryOne(
      `UPDATE users SET ${fields.join(', ')}, updated_at = NOW() WHERE id = $${paramIndex} RETURNING *`,
      values
    );
    return result;
  }

  static async delete(id: string): Promise<void> {
    await dbQuery('DELETE FROM users WHERE id = $1', [id]);
  }

  static async getAll(limit: number = 20, offset: number = 0): Promise<User[]> {
    return dbQuery('SELECT * FROM users ORDER BY created_at DESC LIMIT $1 OFFSET $2', [limit, offset]);
  }
}
