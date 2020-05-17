// import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';

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

    await this.usersTokenRepository.generate(checkUser.id);

    this.emailProvider.sendEmail(
      email,
      'Pedido de recuperação de senha recebido',
    );
  }
}

export default SendForgotPasswordEmailService;
