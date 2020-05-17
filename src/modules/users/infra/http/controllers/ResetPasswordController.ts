import { Request, Response } from 'express';
import ResetePasswordService from '@modules/users/services/ResetePasswordService';
import { container } from 'tsyringe';

class ResetPasswordController {
  public async create(req: Request, res: Response): Promise<Response> {
    const resetPasswordService = container.resolve(ResetePasswordService);

    const { password, token } = req.body;

    await resetPasswordService.execute({ password, token });

    return res.status(204).json();
  }
}

export default ResetPasswordController;
