import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import UpdateUserProfileService from './UpdateProfileService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateUserProfileService: UpdateUserProfileService;

describe('UpdateProfileService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    updateUserProfileService = new UpdateUserProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });
  it('should be able change his email and password', async () => {
    const { id: user_id } = await fakeUsersRepository.create({
      name: 'Teste teste',
      email: 'Teste@gamil.com',
      password: '123456',
    });

    const upadateUser = await updateUserProfileService.execute({
      user_id,
      name: 'testeoutro',
      email: 'TesteOutro@gmail.com',
    });
    expect(upadateUser.name).toBe('testeoutro');
    expect(upadateUser.email).toBe('TesteOutro@gmail.com');
  });
  it('should not be able to change the another email', async () => {
    await fakeUsersRepository.create({
      name: 'jhon1',
      email: 'jhon1@gmail.com',
      password: '123456',
    });

    const { id: user_id } = await fakeUsersRepository.create({
      name: 'Teste teste',
      email: 'TesteOutro@gmail.com',
      password: '123456',
    });
    await expect(
      updateUserProfileService.execute({
        user_id,
        name: 'Teste teste',
        email: 'jhon1@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should be able to update the password', async () => {
    const { id: user_id } = await fakeUsersRepository.create({
      name: 'Teste teste',
      email: 'Teste@gamil.com',
      password: '123456',
    });

    const upadateUser = await updateUserProfileService.execute({
      user_id,
      name: 'testeoutro',
      email: 'Teste@gamil.com',
      old_Password: '123456',
      password: '741852963',
    });

    expect(upadateUser.password).toBe('741852963');
  });
  it('should not be able to update the password without old password', async () => {
    const { id: user_id } = await fakeUsersRepository.create({
      name: 'Teste teste',
      email: 'Teste@gamil.com',
      password: '123456',
    });

    await expect(
      updateUserProfileService.execute({
        user_id,
        name: 'testeoutro',
        password: '741852963',
        email: 'TesteOutro@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old password', async () => {
    const { id: user_id } = await fakeUsersRepository.create({
      name: 'Teste teste',
      email: 'Teste@gamil.com',
      password: '123456',
    });

    await expect(
      updateUserProfileService.execute({
        user_id,
        name: 'testeoutro',
        password: '741852963',
        old_Password: 'wrong password',
        email: 'TesteOutro@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
