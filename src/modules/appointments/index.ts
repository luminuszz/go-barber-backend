import { container } from 'tsyringe';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

const repositories = {
  appointmentRepository: AppointmentsRepository,
};

container.registerSingleton<IAppointmentsRepository>(
  'AppointmentRepository',
  repositories.appointmentRepository,
);
