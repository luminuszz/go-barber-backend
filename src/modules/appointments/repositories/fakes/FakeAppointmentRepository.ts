import { uuid } from 'uuidv4';
import { isEqual, getMonth, getYear } from 'date-fns';

import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

import IFindAllInMouthFromProvider from '@modules/appointments/dtos/IFindAllInMouthFromProviderDTO';
import Appointment from '../../infra/typeorm/entities/Appointments';

class AppointmentsRepository implements IAppointmentRepository {
  private appointements: Appointment[] = [];

  public async create({
    date,
    provider_id,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointement = new Appointment();

    Object.assign(appointement, { id: uuid(), date, provider_id });

    this.appointements.push(appointement);

    return appointement;
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointements.find(appointement =>
      isEqual(appointement.date, date),
    );

    return findAppointment;
  }

  public async findAllInMouthFromProvider({
    month,
    provider_id,
    year,
  }: IFindAllInMouthFromProvider): Promise<Appointment[]> {
    const findAppointments = this.appointements.filter(appointement => {
      return (
        appointement.provider_id === provider_id &&
        getMonth(appointement.date) + 1 === month &&
        getYear(appointement.date) === year
      );
    });

    return findAppointments;
  }
}

export default AppointmentsRepository;
