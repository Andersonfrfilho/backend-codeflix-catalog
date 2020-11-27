import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import ISaveCacheDTO from '@shared/container/providers/CacheProvider/dtos/ISaveCacheDTO';
import Redis, { Redis as RedisClient } from 'ioredis';
import cacheConfig from '@config/cache';

export default class RedisCacheProvider implements ICacheProvider {
  private client: RedisClient;

  constructor() {
    this.client = new Redis(cacheConfig.config.redis);
  }

  async save({ key, value }: ISaveCacheDTO): Promise<void> {
    this.client.set(key, JSON.stringify(value));
  }

  async recover<T>({ key }: { key: string }): Promise<T | undefined> {
    const data = await this.client.get(key);
    if (!data) {
      return undefined;
    }
    const parsedData = JSON.parse(data) as T;
    return parsedData;
  }

  async invalidateByKey({ key }: { key: string }): Promise<void> {
    await this.client.del(key);
  }

  async invalidatePrefix({ prefix }: { prefix: string }): Promise<void> {
    const keys = await this.client.keys(`${prefix}:*`);
    const pipeline = this.client.pipeline();
    keys.forEach(key => {
      pipeline.del(key);
    });
    await pipeline.exec();
  }
}
