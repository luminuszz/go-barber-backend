import Redis, { Redis as RedisType } from 'ioredis';

import ICacheProvider from '../models/ICacheProvider';
import ISaveCacheDTO from '../dtos/ISaveCacheDTO';

class RedisCacheProvider implements ICacheProvider {
  private client: RedisType;

  constructor() {
    this.client = new Redis();
  }

  public save({ key, value }: ISaveCacheDTO): Promise<void> {}

  public recovery(key: string): Promise<string> {}

  public invalidate(key: string): Promise<void> {}
}

export default RedisCacheProvider;
