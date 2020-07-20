import AppError from '@shared/errors/AppError';
import FakeCacheProvider from '@shared/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;
let fakeCacheProvider: FakeCacheProvider;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();
    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCacheProvider,
    );
  });

  it('should create a new User', async () => {
    const user = {
      name: 'DaviTEste',
      email: 'daviTeste@gmail.com',
      password: 'TesteDavi',
    };
    const newUser = await createUserService.execute(user);
    expect(newUser).toHaveProperty('id');
  });
  it('should not be able create user with same email', async () => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCacheProvider,
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
