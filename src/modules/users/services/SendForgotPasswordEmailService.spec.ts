import AppError from '@shared/errors/AppError';
import FakeEmailProvider from '@shared/providers/MailProvider/fakes/FakeEmailProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

describe('SendForgotPasswordEmail', () => {
  it('should coverd the password using the his email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeEmailProvider = new FakeEmailProvider();
    const sendForgotPasswordEmailService = new SendForgotPasswordEmailService(
      fakeUsersRepository,
    );
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
});
