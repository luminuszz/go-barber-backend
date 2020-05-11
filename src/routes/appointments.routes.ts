import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';
import ensureAuth from '../middlewares/ensureAth';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuth);

appointmentsRouter.get('/', async (req, res) => {
  const appointmentRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentRepository.find();
  return res.json(appointments);
});

appointmentsRouter.post('/', async (req, res) => {
  const { provider_id, date } = req.body;
  const createAppointmentService = new CreateAppointmentService();

  try {
    const parsedDate = parseISO(date);
    const appointment = await createAppointmentService.execute({
      date: parsedDate,
      provider_id,
    });
    return res.json(appointment);
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
});

export default appointmentsRouter;
