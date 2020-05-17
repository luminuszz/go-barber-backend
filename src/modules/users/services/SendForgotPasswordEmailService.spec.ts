import AppError from '@shared/errors/AppError';
import FakeEmailProvider from '@shared/providers/MailProvider/fakes/FakeEmailProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';
import FakeUserTokenRepository from '../repositories/fakes/FakeUserTokenRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokenRepository: FakeUserTokenRepository;
let fakeEmailProvider: FakeEmailProvider;
let sendForgotPasswordEmailService: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokenRepository = new FakeUserTokenRepository();
    fakeEmailProvider = new FakeEmailProvider();
    sendForgotPasswordEmailService = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeEmailProvider,
      fakeUserTokenRepository,
    );
  });
  it('should be able coverd the password using the his email', async () => {
    const sendEmail = jest.spyOn(fakeEmailProvider, 'sendEmail');

    const { email } = await fakeUsersRepository.create({
      email: 'daviTesteEmail@gmail.com',
      name: 'DaviTesteEmail',
      password: '123456',
    });

    await sendForgotPasswordEmailService.execute({
      email,
    });
    expect(sendEmail).toHaveBeenCalled();
  });
  it('should not be able to recover the his password if his email does not exists', async () => {
    await expect(
      sendForgotPasswordEmailService.execute({
        email: 'daviTeste@1.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should generate a forgot password token', async () => {
    const sendEmail = jest.spyOn(fakeEmailProvider, 'sendEmail');
    const generate = jest.spyOn(fakeUserTokenRepository, 'generate');

    const { id, email } = await fakeUsersRepository.create({
      email: 'daviTesteEmail@gmail.com',
      name: 'DaviTesteEmail',
      password: '123456',
    });

    await sendForgotPasswordEmailService.execute({
      email,
    });

    expect(generate).toHaveBeenCalledWith(id);
  });
});
