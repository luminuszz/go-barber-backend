import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { parseISO } from 'date-fns';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

class AppointmentsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { provider_id, date } = req.body;
    const createAppointmentService = container.resolve(
      CreateAppointmentService,
    );

    const parsedDate = parseISO(date);

    const appointment = await createAppointmentService.execute({
      date: parsedDate,
      provider_id,
    });
    return res.json(appointment);
  }
}

export default AppointmentsController;