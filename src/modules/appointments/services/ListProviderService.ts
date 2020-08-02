import { injectable, inject } from 'tsyringe';
import IUsersRepository from '@modules/users/repositories/IUserRepository';
import { classToClass } from 'class-transformer';
import ICacheProvider from '@shared/providers/CacheProvider/models/ICacheProvider';

import User from '@modules/users/infra/typeorm/entities/User';

interface IRequestDTO {
  user_id: string;
}

@injectable()
class ListProviderService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ user_id }: IRequestDTO): Promise<User[]> {
    let users = await this.cacheProvider.recovery<User[]>(
      `providers-list:${user_id}`,
    );

    if (!users) {
      users = await this.usersRepository.findAllProviders({
        except_user_id: user_id,
      });

      await this.cacheProvider.save({
        key: `providers-list:${user_id}`,
        value: classToClass(users),
      });
    }

    return users;
  }
}

export default ListProviderService;
