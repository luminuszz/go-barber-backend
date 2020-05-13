import { Router } from 'express';

import ensureAuth from '@modules/users/infra/http/middlewares/ensureAth';
import AppointmentsController from '../controllers/AppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();
appointmentsRouter.use(ensureAuth);

/* appointmentsRouter.get('/', async (req, res) => {
  const appointmentRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentRepository.find();
  return res.json(appointments);
}); */

appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;
