import ISaveCacheDTO from '../dtos/ISaveCacheDTO';

export default interface ICacheProvider {
  save(data: ISaveCacheDTO): Promise<void>;
  recovery(key: string): Promise<string>;
  invalidate(key: string): Promise<void>;
}
