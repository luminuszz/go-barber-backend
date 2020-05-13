import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateSessionService from './CreateSessionService';
import CreateUserService from './CreateUserService';

describe('CreateSession', () => {
  it('should be able to create a new Session', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createSessionService = new CreateSessionService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUserService.execute({
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
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createSessionService = new CreateSessionService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    expect(
      createSessionService.execute({
        email: 'daviTesteErrado@dsa.com',
        password: '1234',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  // -----------------------------------------------------//

  it('should not be able to create a new Session if password and password Hash does not match', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createSessionService = new CreateSessionService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createUserService.execute({
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
