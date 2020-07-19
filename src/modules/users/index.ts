import { container } from 'tsyringe';

import IUserRepository from '@modules/users/repositories/IUserRepository';
import UserRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokenRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UsersTokensRepository';

const repositories = {
  userRepository: UserRepository,
  userTokensRepository: UserTokensRepository,
};

container.registerSingleton<IUserRepository>(
  'UserRepository',
  repositories.userRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  repositories.userTokensRepository,
);
