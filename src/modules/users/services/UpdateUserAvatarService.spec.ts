import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import FakeStorageProvider from '@shared/providers/storageProvider/fakes/FakeStorageProvider';
import UserAvatarService from './UpdateUserAvatarService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

describe('UpdateAvatar', () => {
  it('should be able to update a avatar', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();
    const updateUserAvatarService = new UserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );
    const user = {
      name: 'DaviTEste',
      email: 'daviTeste@gmail.com',
      password: 'TesteDavi',
    };
    const newUser = await fakeUsersRepository.create(user);

    await updateUserAvatarService.execute({
      user_id: newUser.id,
      avatarFilename: 'avatar.jpg',
    });
    expect(newUser.avatar).toBe('avatar.jpg');
  });
  // ------------------------

  it('should not be able to update avatar if user does not exists', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();
    const updateUserAvatarService = new UserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );
    const user = {
      name: 'DaviTEste',
      email: 'daviTeste@gmail.com',
      password: 'TesteDavi',
    };
    await fakeUsersRepository.create(user);

    expect(
      updateUserAvatarService.execute({
        user_id: 'non-existing',
        avatarFilename: 'avatar.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  // ---------------------------------------

  it('should be able to delete a avatar if he exists and Update he ', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const updateUserAvatarService = new UserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );
    const user = {
      name: 'DaviTEste',
      email: 'daviTeste@gmail.com',
      password: 'TesteDavi',
    };
    const newUser = await fakeUsersRepository.create(user);

    await updateUserAvatarService.execute({
      user_id: newUser.id,
      avatarFilename: 'avatar.jpg',
    });

    await updateUserAvatarService.execute({
      user_id: newUser.id,
      avatarFilename: 'avatar2.jpg',
    });
    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');

    expect(newUser.avatar).toBe('avatar2.jpg');
  });
});
