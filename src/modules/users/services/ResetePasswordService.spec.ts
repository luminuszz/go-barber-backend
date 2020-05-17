/* eslint-disable prefer-const */
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import ResetPasswordService from './ResetePasswordService';
import FakeUserTokenRepository from '../repositories/fakes/FakeUserTokenRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokenRepository: FakeUserTokenRepository;
let resetPasswordService: ResetPasswordService;
let fakeHashProvider: FakeHashProvider;

describe('ResetPasswordService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokenRepository = new FakeUserTokenRepository();
    fakeHashProvider = new FakeHashProvider();
    resetPasswordService = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokenRepository,
      fakeHashProvider,
    );
  });
  it('should be able reset the password', async () => {
    const user = await fakeUsersRepository.create({
      email: 'daviTesteEmail@gmail.com',
      name: 'DaviTesteEmail',
      password: '13456',
    });

    const { token } = await fakeUserTokenRepository.generate(user.id);

    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    await resetPasswordService.execute({
      password: '123123',
      token,
    });
    const updateUser = await fakeUsersRepository.findByEmail(user.email);

    expect(generateHash).toBeCalledWith('123123');
    expect(updateUser?.password).toBe('123123');
  });

  it('should not be able to reset the password if his user token does not exists', async () => {
    await expect(
      resetPasswordService.execute({
        password: '123154',
        token: 'not exists',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password if his user does not exists', async () => {
    const { token } = await fakeUserTokenRepository.generate(
      'user does not exiists',
    );

    await expect(
      resetPasswordService.execute({ password: '123456', token }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to reset the password if token passed more than 2 hours', async () => {
    const user = await fakeUsersRepository.create({
      email: 'daviTesteEmail@gmail.com',
      name: 'DaviTesteEmail',
      password: '13456',
    });

    const { token } = await fakeUserTokenRepository.generate(user.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      resetPasswordService.execute({
        password: '123123',
        token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
// [x] Ele pode resetar sua senha
// [x] Gerar hash da senha
// [x] Ele não pode fazer o reset caso o usuário não exista
// [x] Teste para caso o user e o userToken não exista
