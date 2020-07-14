import AppError from '@shared/errors/AppError';

import { injectable, inject } from 'tsyringe';
import IUsersRepository from '@modules/users/repositories/IUserRepository';

import User from '@modules/users/infra/typeorm/entities/User';

interface IRequestDTO {
  user_id: string;
}

@injectable()
class ListProviderService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id }: IRequestDTO): Promise<User[]> {
    const users = await this.usersRepository.findAllProviders({
      except_user_id: user_id,
    });

    if (!users) {
      throw new AppError('Users not found');
    }

    return users;
  }
}

export default ListProviderService;
