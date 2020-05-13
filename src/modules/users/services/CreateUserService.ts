import { getRepository } from 'typeorm';
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import IUsersRepository from '../repositories/IUserRepository';

interface IRequestDTO {
  name: string;
  email: string;
  password: string;
}
@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ email, name, password }: IRequestDTO): Promise<User> {
    const userRepository = getRepository(User);

    const checkUser = await this.usersRepository.findByEmail(email);

    if (checkUser) {
      throw new AppError('Email addres already used', 400);
    }

    const newUser = await this.usersRepository.create({
      email,
      name,
      password,
    });

    return newUser;
  }
}

export default CreateUserService;
