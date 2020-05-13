import { Router } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import ensureAuth from '@modules/users/infra/http/middlewares/ensureAth';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuth);

/* appointmentsRouter.get('/', async (req, res) => {
  const appointmentRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentRepository.find();
  return res.json(appointments);
}); */

appointmentsRouter.post('/', async (req, res) => {
  const { provider_id, date } = req.body;
  const createAppointmentService = container.resolve(CreateAppointmentService);

  const parsedDate = parseISO(date);
  const appointment = await createAppointmentService.execute({
    date: parsedDate,
    provider_id,
  });
  return res.json(appointment);
});

export default appointmentsRouter;
