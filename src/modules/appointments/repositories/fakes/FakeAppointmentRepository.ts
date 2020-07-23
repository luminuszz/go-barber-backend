import { uuid } from 'uuidv4';
import { isEqual, getMonth, getYear, getDate } from 'date-fns';

import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepository';

import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

import IFindAllInMouthFromProvider from '@modules/appointments/dtos/IFindAllInMouthFromProviderDTO';

import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO';

import IFindByDateAppointmentDTO from '@modules/appointments/dtos/IFindByDateAppointmentDTO';

import Appointment from '../../infra/typeorm/entities/Appointments';

class AppointmentsRepository implements IAppointmentRepository {
  private appointements: Appointment[] = [];

  public async create({
    date,
    provider_id,
    user_id,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointement = new Appointment();

    Object.assign(appointement, { id: uuid(), date, provider_id, user_id });

    this.appointements.push(appointement);

    return appointement;
  }

  public async findByDate({
    date,
    provider_id,
  }: IFindByDateAppointmentDTO): Promise<Appointment | undefined> {
    const findAppointment = this.appointements.find(
      appointement =>
        isEqual(appointement.date, date) &&
        appointement.provider_id === provider_id,
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

  public async findAllInDayFromProvider({
    day,
    month,
    provider_id,
    year,
  }: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
    const findAppointments = this.appointements.filter(appointement => {
      return (
        appointement.provider_id === provider_id &&
        getDate(appointement.date) === day &&
        getMonth(appointement.date) + 1 === month &&
        getYear(appointement.date) === year
      );
    });

    return findAppointments;
  }
}

export default AppointmentsRepository;
