import AppError from '@shared/errors/AppError';

import { injectable, inject } from 'tsyringe';

import { getDaysInMonth, getDate } from 'date-fns';
import IAppointmentRepository from '../repositories/IAppointmentsRepository';

/* import User from '@modules/users/infra/typeorm/entities/User'; */

interface IRequestDTO {
  provider_id: string;
  month: number;
  year: number;
}

type IResponse = Array<{
  day: number;
  available: boolean;
}>;

@injectable()
class ListProviderMonthAvailabilityService {
  constructor(
    @inject('AppointmentRepository')
    private appointmentRepository: IAppointmentRepository,
  ) {}

  public async execute({
    month,
    provider_id,
    year,
  }: IRequestDTO): Promise<IResponse> {
    const appointments = await this.appointmentRepository.findAllInMouthFromProvider(
      {
        month,
        provider_id,
        year,
      },
    );
    const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1));

    const eachDayArray = Array.from(
      { length: numberOfDaysInMonth },
      (_, index) => index + 1,
    );

    const availability = eachDayArray.map(day => {
      const appointmentsInDay = appointments.filter(appointment => {
        return getDate(appointment.date) === day;
      });
      return {
        day,
        available: appointmentsInDay.length < 10,
      };
    });

    return availability;
  }
}

export default ListProviderMonthAvailabilityService;
