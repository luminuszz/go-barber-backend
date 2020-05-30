import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUserRepository';

interface IRequestDTO {
  user_id: string;
  name: string;
  email: string;
  old_Password?: string;
  password?: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    email,
    name,
    user_id,
    old_Password,
    password,
  }: IRequestDTO): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Erro');
    }

    const findEmail = await this.usersRepository.findByEmail(email);

    if (findEmail && findEmail.id !== user_id) {
      throw new AppError('these emails are equals');
    }

    user.name = name;
    user.email = email;

    if (password && !old_Password) {
      throw new AppError('you need send the old password');
    }

    if (password && old_Password) {
      const checkOldPassword = await this.hashProvider.compareHash(
        old_Password,
        user.password,
      );

      if (!checkOldPassword) {
        throw new AppError('Old Password does not macht');
      }

      user.password = await this.hashProvider.generateHash(password);
    }

    await this.usersRepository.update(user);
    return user;
  }
}

export default UpdateProfileService;
