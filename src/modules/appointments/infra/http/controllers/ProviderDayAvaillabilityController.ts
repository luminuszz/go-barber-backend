import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';

class ProviderDayAvaillabilityController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { provider_id } = req.params;
    const { day, month, year } = req.body;

    const listProviderDayAvailability = container.resolve(
      ListProviderDayAvailabilityService,
    );

    const availability = await listProviderDayAvailability.execute({
      day,
      month,
      provider_id,
      year,
    });

    return res.json(availability);
  }
}

export default ProviderDayAvaillabilityController;
