import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import ListProviderService from '@modules/appointments/services/ListProviderService';

class ProvidersController {
  public async index(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const listProviderService = container.resolve(ListProviderService);

    const providers = await listProviderService.execute({
      user_id,
    });
    return res.json(classToClass(providers));
  }
}

export default ProvidersController;
