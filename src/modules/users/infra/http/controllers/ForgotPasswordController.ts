import { Request, Response } from 'express';
import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService';
import { container } from 'tsyringe';

class ForgotPasswordController {
  public async create(req: Request, res: Response): Promise<Response> {
    const SendforgotEmailService = container.resolve(
      SendForgotPasswordEmailService,
    );

    const { email } = req.body;

    await SendforgotEmailService.execute({ email });

    return res.status(204).json();
  }
}

export default ForgotPasswordController;
