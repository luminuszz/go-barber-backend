import { uuid } from 'uuidv4';

import IUserTokenRepository from '@modules/users/repositories/IUserTokenRepository';

import UserToken from '../../infra/typeorm/entities/UserToken';

class FakeUserTokenRepository implements IUserTokenRepository {
  private userTokens: UserToken[] = [];

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = new UserToken();
    Object.assign(userToken, {
      id: uuid(),
      token: uuid(),
      user_id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    this.userTokens.push(userToken);
    return userToken;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = this.userTokens.find(
      arrayToken => arrayToken.token === token,
    );

    return userToken;
  }
}

export default FakeUserTokenRepository;
