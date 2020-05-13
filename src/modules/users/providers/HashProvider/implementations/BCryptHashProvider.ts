import { hash, compare } from 'bcryptjs';
import IHashProvider from '../models/IHashProvider';

class BCryptHashProvider implements IHashProvider {
  public async generateHash(payload: string): Promise<string> {
    const newHash = await hash(payload, 8);

    return newHash;
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    const checkHash = await compare(payload, hashed);

    return checkHash;
  }
}

export default BCryptHashProvider;
