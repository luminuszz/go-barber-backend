import Queue from 'bull';
import cacheConfig from '@Config/cache';
import IJobProvider from '../models/IJobProvider';

const { redis } = cacheConfig.config;

class BullJobProvider implements IJobProvider {
  public async execute(key: string, data: string): Promise<void> {
    const queue = new Queue(key, { redis });
  }
}

export default BullJobProvider;
