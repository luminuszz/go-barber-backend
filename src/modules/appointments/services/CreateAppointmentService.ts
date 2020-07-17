import { startOfHour, isBefore, getHours } from 'date-fns';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
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
  ) {}

  public async execute({
    date,
    provider_id,
    user_id,
  }: IRequestDTO): Promise<Appointment> {
    const startDate = startOfHour(date);

    if (provider_id === user_id) {
      throw new AppError('You can not create appointment with for yourself');
    }

    if (getHours(startDate) < 8 || getHours(startDate) > 17) {
      throw new AppError(
        'should not be able to create an appointment before 8:00 AM and after 17:00 PM',
      );
    }

    if (isBefore(startDate, Date.now())) {
      throw new AppError('You can not create an appointment on a past date.');
    }

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      startDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError(' This appointment is already booked', 401);
    }

    const newAppointment = await this.appointmentsRepository.create({
      date: startDate,
      provider_id,
      user_id,
    });

    return newAppointment;
  }
}

export default CreateAppointmentService;
