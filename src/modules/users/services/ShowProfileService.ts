import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import IUsersRepository from '../repositories/IUserRepository';

interface IRequestDTO {
  user_id: string;
}

@injectable()
class ShowProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id }: IRequestDTO): Promise<User> {
    const findUser = await this.usersRepository.findById(user_id);

    if (!findUser) {
      throw new AppError('User not found');
    }

    return findUser;
  }
}

export default ShowProfileService;
