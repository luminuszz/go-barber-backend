import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateSessionService from './CreateSessionService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createSessionService: CreateSessionService;

describe('CreateSession', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createSessionService = new CreateSessionService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });
  it('should be able to create a new Session', async () => {
    const user = await fakeUsersRepository.create({
      email: 'daviTeste@dsa.com',
      name: 'daviTeste',
      password: '1234',
    });

    const session = await createSessionService.execute({
      email: 'daviTeste@dsa.com',
      password: '1234',
    });

    expect(session).toHaveProperty('token');
    expect(session.user).toEqual(user);
  });

  it('should not be able to create a new Session if email does not match', async () => {
    expect(
      createSessionService.execute({
        email: 'daviTesteErrado@dsa.com',
        password: '1234',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  // -----------------------------------------------------//

  it('should not be able to create a new Session if password and password Hash does not match', async () => {
    await fakeUsersRepository.create({
      email: 'daviTeste@dsa.com',
      name: 'daviTeste',
      password: '1234',
    });

    expect(
      createSessionService.execute({
        email: 'daviTeste@dsa.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
