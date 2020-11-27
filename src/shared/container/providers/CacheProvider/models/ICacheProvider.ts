import ISaveCacheDTO from '@shared/container/providers/CacheProvider/dtos/ISaveCacheDTO';

export default interface ICacheProvider {
  save(data: ISaveCacheDTO): Promise<void>;
  recover<T>({ key }: { key: string }): Promise<T | undefined>;
  invalidateByKey({ key }: { key: string }): Promise<void>;
  invalidatePrefix({ prefix }: { prefix: string }): Promise<void>;
}
