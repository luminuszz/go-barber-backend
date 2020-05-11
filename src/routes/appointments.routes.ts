import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();

appointmentsRouter.get('/', async (req, res) => {
  const appointmentRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentRepository.find();
  return res.json(appointments);
});

appointmentsRouter.post('/', async (req, res) => {
  const { provider, date } = req.body;
  const createAppointmentService = new CreateAppointmentService();

  try {
    const parsedDate = parseISO(date);
    const appointment = await createAppointmentService.execute({
      date: parsedDate,
      provider,
    });
    return res.json(appointment);
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
});

export default appointmentsRouter;
