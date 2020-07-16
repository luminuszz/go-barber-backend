import { getHours, isAfter } from 'date-fns';
import { injectable, inject } from 'tsyringe';

/* import { getDaysInMonth, getDate } from 'date-fns'; */
import IAppointmentRepository from '../repositories/IAppointmentsRepository';

/* import User from '@modules/users/infra/typeorm/entities/User'; */

interface IRequestDTO {
  provider_id: string;
  month: number;
  year: number;
  day: number;
}

type IResponse = Array<{
  hour: number;
  available: boolean;
}>;

@injectable()
class ListProviderDayAvailabilityService {
  constructor(
    @inject('AppointmentRepository')
    private appointmentRepository: IAppointmentRepository,
  ) {}

  public async execute({
    month,
    provider_id,
    year,
    day,
  }: IRequestDTO): Promise<IResponse> {
    const appoitments = await this.appointmentRepository.findAllInDayFromProvider(
      {
        month,
        provider_id,
        year,
        day,
      },
    );

    const hourStart = 8;

    const eachHourArray = Array.from(
      { length: 10 },
      (_, index) => index + hourStart,
    );

    const currentDate = new Date(Date.now());

    const availability = eachHourArray.map(hour => {
      const hasAppointmentInHour = appoitments.find(
        appoitment => getHours(appoitment.date) === hour,
      );

      const compareDate = new Date(year, month - 1, day, hour);

      return {
        hour,
        available: !hasAppointmentInHour && isAfter(compareDate, currentDate),
      };
    });

    return availability;
  }
}

export default ListProviderDayAvailabilityService;
