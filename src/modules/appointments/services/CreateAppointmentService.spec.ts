import AppError from '@shared/errors/AppError';
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentRepository';

import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentRepository: FakeAppointmentRepository;
let createAppointmentService: CreateAppointmentService;
describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();

    createAppointmentService = new CreateAppointmentService(
      fakeAppointmentRepository,
    );
  });
  it('should be able to create new appointment', async () => {
    fakeAppointmentRepository = new FakeAppointmentRepository();

    createAppointmentService = new CreateAppointmentService(
      fakeAppointmentRepository,
    );
    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    const newAppointment = await createAppointmentService.execute({
      date: new Date(2020, 4, 10, 13),
      provider_id: '12124545',
      user_id: '123456',
    });

    expect(newAppointment).toHaveProperty('id');
    expect(newAppointment.provider_id).toBe('12124545');
  });
  it('should not able to create new appointment in the same date', async () => {
    fakeAppointmentRepository = new FakeAppointmentRepository();

    createAppointmentService = new CreateAppointmentService(
      fakeAppointmentRepository,
    );

    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });
    const sameDate = new Date(2020, 4, 10, 12);

    await createAppointmentService.execute({
      date: sameDate,
      provider_id: '12124545',
      user_id: '123456',
    });

    //

    await expect(
      createAppointmentService.execute({
        date: sameDate,
        provider_id: '12124545',
        user_id: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to create an appointments on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointmentService.execute({
        date: new Date(2020, 4, 10, 11),
        provider_id: '12124545',
        user_id: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to create an appointment with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointmentService.execute({
        date: new Date(2020, 4, 10, 13),
        provider_id: '123456',
        user_id: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to create an appointment before 8:00 AM and after 17:00 PM ', async () => {
    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointmentService.execute({
        date: new Date(2020, 4, 11, 7),
        provider_id: 'user_id',
        user_id: 'Provider_id',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointmentService.execute({
        date: new Date(2020, 4, 11, 18),
        provider_id: 'user_id',
        user_id: 'Provider_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
