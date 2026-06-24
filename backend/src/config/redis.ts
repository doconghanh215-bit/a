import * as redis from 'redis';
import { logger } from '../utils/logger';

const client = redis.createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
  socket: {
    reconnectStrategy: (retries) => Math.min(retries * 50, 500)
  }
});

client.on('error', (err) => logger.error('Redis error:', err));
client.on('connect', () => logger.info('Redis connected'));

export const connectRedis = async () => {
  await client.connect();
};

export const getCache = async (key: string) => {
  const data = await client.get(key);
  return data ? JSON.parse(data) : null;
};

export const setCache = async (key: string, value: any, ttl: number = 3600) => {
  await client.setEx(key, ttl, JSON.stringify(value));
};

export const deleteCache = async (key: string) => {
  await client.del(key);
};

export const clearCache = async (pattern: string) => {
  const keys = await client.keys(pattern);
  if (keys.length > 0) {
    await client.del(keys);
  }
};

export default client;
