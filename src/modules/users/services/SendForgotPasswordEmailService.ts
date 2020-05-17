// import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import path from 'path';
import { injectable, inject } from 'tsyringe';
import IEmailProvider from '@shared/providers/MailProvider/models/IMailProvider';
import IUsersRepository from '../repositories/IUserRepository';
import IUserTokensRepository from '../repositories/IUserTokenRepository';

interface IRequestDTO {
  email: string;
}
@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('EmailProvider')
    private emailProvider: IEmailProvider,

    @inject('UserTokenRepository')
    private usersTokenRepository: IUserTokensRepository,
  ) {}

  public async execute({ email }: IRequestDTO): Promise<void> {
    const checkUser = await this.usersRepository.findByEmail(email);

    if (!checkUser) {
      throw new AppError('User does not exists');
    }

    const { token } = await this.usersTokenRepository.generate(checkUser.id);

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    );

    await this.emailProvider.sendEmail({
      to: {
        email: checkUser.email,
        name: checkUser.name,
      },

      subject: '[Miteres] Recuperação de senha ',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: checkUser.name,
          token,
          link: `http://locahost:3000/reset_password/?token=${token}`,
        },
      },
    });
  }
}

export default SendForgotPasswordEmailService;
