import { container } from 'tsyringe';
// Users Providers
import '@modules/users/providers';

// Shared Providers
import '@shared/providers';

// Appointments
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
//

// Users

import IUserRepository from '@modules/users/repositories/IUserRepository';
import UserRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokenRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UsersTokensRepository';

container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository',
  AppointmentsRepository,
);

container.registerSingleton<IUserRepository>('UsersRepository', UserRepository);

container.registerSingleton<IUserTokensRepository>(
  'UserTokenRepository',
  UserTokensRepository,
);
