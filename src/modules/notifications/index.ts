import { container } from 'tsyringe';

import INotificationRepository from '@modules/notifications/repositories/INotificationRepository';
import NotificationRepository from '@modules/notifications/infra/typeorm/repositories/NotificationRepository';

const repositories = {
  notificationRepository: NotificationRepository,
};

container.registerSingleton<INotificationRepository>(
  'AppointmentsRepository',
  repositories.notificationRepository,
);
