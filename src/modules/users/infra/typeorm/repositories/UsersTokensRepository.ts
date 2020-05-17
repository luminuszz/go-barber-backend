import { getRepository, Repository } from 'typeorm';
import IUsersTokensRepository from '@modules/users/repositories/IUserTokenRepository';
import UserToken from '../entities/UserToken';

type Response = UserToken | undefined;

class UsersTokensRepository implements IUsersTokensRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = getRepository(UserToken);
  }

  public async findByToken(token: string): Promise<Response> {
    const userToken = this.ormRepository.findOne({ where: token });

    return userToken;
  }

  public async generate(user_id: string): Promise<UserToken> {
    const newToken = this.ormRepository.create({
      user_id,
    });

    await this.ormRepository.save(newToken);

    return newToken;
  }
}

export default UsersTokensRepository;
