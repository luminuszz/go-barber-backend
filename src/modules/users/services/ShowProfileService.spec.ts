import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import ShowProfileService from './ShowProfileService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

let fakeUsersRepository: FakeUsersRepository;

let showProfileService: ShowProfileService;

describe('UpdateProfileService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showProfileService = new ShowProfileService(fakeUsersRepository);
  });
  it('should be able show user profile', async () => {
    const { id: user_id } = await fakeUsersRepository.create({
      name: 'Teste teste',
      email: 'Teste@gamil.com',
      password: '123456',
    });

    const upadateUser = await showProfileService.execute({
      user_id,
    });
    expect(upadateUser).toHaveProperty('id');
  });

  it('should not be able show user profile if user does not exists', async () => {
    await fakeUsersRepository.create({
      name: 'Teste teste',
      email: 'Teste@gamil.com',
      password: '123456',
    });

    await expect(
      showProfileService.execute({
        user_id: 'wong_user',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
