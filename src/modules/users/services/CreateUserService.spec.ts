import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('CreateUser', () => {
  it('should create a new User', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    const user = {
      name: 'DaviTEste',
      email: 'daviTeste@gmail.com',
      password: 'TesteDavi',
    };
    const newUser = await createUserService.execute(user);
    expect(newUser).toHaveProperty('id');
  });
  it('should not be able create user with same email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    const user = {
      name: 'DaviTEste',
      email: 'daviTeste@gmail.com',
      password: 'TesteDavi',
    };
    await createUserService.execute(user);

    expect(createUserService.execute(user)).rejects.toBeInstanceOf(AppError);
  });
});
