import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import ISaveCacheDTO from '@shared/container/providers/CacheProvider/dtos/ISaveCacheDTO';

interface ICacheData {
  [key: string]: string;
}
export default class FakeCacheProvider implements ICacheProvider {
  private cache: ICacheData = {};

  async save({ key, value }: ISaveCacheDTO): Promise<void> {
    this.cache[key] = JSON.stringify(value);
  }

  async recover<T>({ key }: { key: string }): Promise<T | undefined> {
    const data = this.cache[key];
    if (!data) {
      return undefined;
    }
    const parsedData = JSON.parse(data) as T;
    return parsedData;
  }

  async invalidateByKey({ key }: { key: string }): Promise<void> {
    delete this.cache[key];
  }

  async invalidatePrefix({ prefix }: { prefix: string }): Promise<void> {
    const keys = Object.keys(this.cache).filter(key =>
      key.startsWith(`${prefix}:`),
    );
    keys.forEach(key => {
      delete this.cache[key];
    });
  }
}
