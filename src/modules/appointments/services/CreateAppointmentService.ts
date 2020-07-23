import { startOfHour, isBefore, getHours, format } from 'date-fns';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/providers/CacheProvider/models/ICacheProvider';

import INotificationRepository from '@modules/notifications/repositories/INotificationRepository';

import Appointment from '../infra/typeorm/entities/Appointments';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequestDTO {
  provider_id: string;
  date: Date;
  user_id: string;
}
@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('NotificationRepository')
    private notificationRepository: INotificationRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    date,
    provider_id,
    user_id,
  }: IRequestDTO): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    if (provider_id === user_id) {
      throw new AppError('You can not create appointment with for yourself');
    }

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
      throw new AppError(
        'should not be able to create an appointment before 8:00 AM and after 17:00 PM',
      );
    }

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError('You can not create an appointment on a past date.');
    }

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      {
        date: appointmentDate,
        provider_id,
      },
    );

    if (findAppointmentInSameDate) {
      throw new AppError(' This appointment is already booked', 401);
    }

    const newAppointment = await this.appointmentsRepository.create({
      date: appointmentDate,
      provider_id,
      user_id,
    });

    const dateFormated = format(appointmentDate, "dd/MM/yyyy 'ás' HH:mm'h'");

    await this.notificationRepository.create({
      recipient_id: provider_id,
      content: `Novo agendamento para o dia${dateFormated}`,
    });

    await this.cacheProvider.invalidate(`
    provider-appointments:${provider_id}:${format(appointmentDate, 'yyyy-M-d')}
    `);

    return newAppointment;
  }
}

export default CreateAppointmentService;
