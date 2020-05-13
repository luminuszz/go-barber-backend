import AppError from '@shared/errors/AppError';
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentRepository';

import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  it('should be able to create new appointment', async () => {
    const fakeAppointmentRepository = new FakeAppointmentRepository();

    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentRepository,
    );
    const newAppointment = await createAppointmentService.execute({
      date: new Date(),
      provider_id: '12124545',
    });

    expect(newAppointment).toHaveProperty('id');
    expect(newAppointment.provider_id).toBe('12124545');
  });
  it('should not able to create new appointment in the same date', async () => {
    const fakeAppointmentRepository = new FakeAppointmentRepository();

    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentRepository,
    );
    const sameDate = new Date(2020, 4, 10, 11);

    await createAppointmentService.execute({
      date: sameDate,
      provider_id: '12124545',
    });

    //

    expect(
      createAppointmentService.execute({
        date: sameDate,
        provider_id: '12124545',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
