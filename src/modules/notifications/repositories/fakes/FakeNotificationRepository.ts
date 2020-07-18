import { ObjectID } from 'mongodb';

import INotificationRepository from '@modules/notifications/repositories/INotificationRepository';

import INotificationRepositoryDTO from '@modules/notifications/dtos/INotificationRepositoryDTO';

import Notification from '../../infra/typeorm/schemas/Notification';

class NotificationRepository implements INotificationRepository {
  private Notifications: Notification[] = [];

  public async create({
    content,
    recipient_id,
  }: INotificationRepositoryDTO): Promise<Notification> {
    const notification = new Notification();

    Object.assign(notification, { id: new ObjectID(), content, recipient_id });

    this.Notifications.push(notification);

    return notification;
  }
}

export default NotificationRepository;
