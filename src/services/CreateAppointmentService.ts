import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '../models/Appointments';
import AppointmentRepository from '../repositories/AppointmentsRepository';

interface RequestDTO {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {
  public async execute({
    date,
    provider_id,
  }: RequestDTO): Promise<Appointment> {
    const appointmentRepository = getCustomRepository(AppointmentRepository);
    const startDate = startOfHour(date);
    const findAppointmentInSameDate = await appointmentRepository.findByDate(
      startDate,
    );

    if (findAppointmentInSameDate) {
      throw Error(' This appointment is already booked');
    }

    const newAppointment = appointmentRepository.create({
      date: startDate,
      provider_id,
    });
    await appointmentRepository.save(newAppointment);

    return newAppointment;
  }
}

export default CreateAppointmentService;
