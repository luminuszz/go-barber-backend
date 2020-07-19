import { inject, injectable } from 'tsyringe';

import IMailTemplateProvider from '@shared/providers/MailTemplateProvider/models/IMailTemplateProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';
import IEmailProvider from '../models/IMailProvider';

@injectable()
class SESMailProvider implements IEmailProvider {
  /*   private client: Transporter; */

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
  ) {}

  public async sendEmail({
    to,
    subject,
    from,
    templateData,
  }: ISendMailDTO): Promise<void> {
    console.log('teste');
  }
}

export default SESMailProvider;
