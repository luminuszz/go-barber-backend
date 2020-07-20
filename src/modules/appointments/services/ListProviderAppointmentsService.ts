import { injectable, inject } from 'tsyringe';
import ICacheProvider from '@shared/providers/CacheProvider/models/ICacheProvider';
import Appointment from '../infra/typeorm/entities/Appointments';
import IAppointmentRepository from '../repositories/IAppointmentsRepository';

interface IRequestDTO {
  provider_id: string;
  month: number;
  year: number;
  day: number;
}

@injectable()
class ListProviderAppointmentsService {
  constructor(
    @inject('AppointmentRepository')
    private appointmentRepository: IAppointmentRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    month,
    provider_id,
    year,
    day,
  }: IRequestDTO): Promise<Appointment[]> {
    //  const cacheData = await this.cacheProvider.recovery('TESTE');

    const appointments = await this.appointmentRepository.findAllInDayFromProvider(
      {
        day,
        month,
        provider_id,
        year,
      },
    );
    //  await this.cacheProvider.save({ key: 'TESTE', value: 'sad' });

    return appointments;
  }
}

export default ListProviderAppointmentsService;
