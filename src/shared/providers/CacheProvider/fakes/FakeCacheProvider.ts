import ICacheProvider from '../models/ICacheProvider';
import ISaveCacheDTO from '../dtos/ISaveCacheDTO';

interface ICacheData {
  [key: string]: string;
}

class RedisCacheProvider implements ICacheProvider {
  private cache: ICacheData = {};

  public async save({ key, value }: ISaveCacheDTO): Promise<void> {
    this.cache[key] = JSON.stringify(value);
  }

  public async recovery<T>(key: string): Promise<T | null> {
    const data = this.cache[key];

    if (!data) {
      return null;
    }

    const parsedData = JSON.parse(data) as T;

    return parsedData;
  }

  public async invalidate(key: string): Promise<void> {
    delete this.cache[key];
  }

  public async invalidatePrefix(prefix: string): Promise<void> {
    const keys = Object.keys(this.cache).filter(key =>
      key.startsWith(`${prefix}:`),
    );

    keys.forEach(key => {
      delete this.cache[key];
    });
  }
}

export default RedisCacheProvider;
