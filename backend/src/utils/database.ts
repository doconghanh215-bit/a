import { query } from '../config/database';
import { setCache, getCache, deleteCache } from '../config/redis';
import { logger } from './logger';

export const dbQuery = async (sql: string, params?: any[]) => {
  try {
    const result = await query(sql, params);
    return result.rows;
  } catch (error) {
    logger.error('Database query error:', error);
    throw error;
  }
};

export const dbQueryOne = async (sql: string, params?: any[]) => {
  const results = await dbQuery(sql, params);
  return results.length > 0 ? results[0] : null;
};

export const cachedQuery = async (cacheKey: string, queryFn: () => Promise<any>, ttl: number = 3600) => {
  const cached = await getCache(cacheKey);
  if (cached) {
    logger.info(`Cache hit: ${cacheKey}`);
    return cached;
  }

  const result = await queryFn();
  await setCache(cacheKey, result, ttl);
  return result;
};
