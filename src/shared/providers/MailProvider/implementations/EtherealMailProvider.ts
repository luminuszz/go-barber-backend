import nodeMailer, { Transporter } from 'nodemailer';
import { inject, injectable } from 'tsyringe';

import IMailTemplateProvider from '@shared/providers/MailTemplateProvider/models/IMailTemplateProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';
import IEmailProvider from '../models/IMailProvider';

@injectable()
class EtherealMaierProvider implements IEmailProvider {
  private client: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
  ) {
    nodeMailer.createTestAccount().then(account => {
      const transporter = nodeMailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });

      this.client = transporter;
    });
  }

  public async sendEmail({
    to,
    subject,
    from,
    templateData,
  }: ISendMailDTO): Promise<void> {
    const messege = await this.client.sendMail({
      from: {
        name: from?.name || 'Equipe Miteres',
        address: from?.email || 'miteres@gmail.com',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
    });
    console.log(messege.messageId);
    console.log(nodeMailer.getTestMessageUrl(messege));
  }
}

export default EtherealMaierProvider;
