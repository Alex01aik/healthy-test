import { INotificationProvider } from './types/INotificationProvider'

export class NotificationProvider<T> {
    private notificationProvider: INotificationProvider<T>;
  
    constructor(notificationProvider: INotificationProvider<T>) {
      this.notificationProvider = notificationProvider;
    }
  
    async sendNotificationToUser(recipient: T, ctx?: string): Promise<any> {
      return this.notificationProvider.sendNotification(recipient, ctx);
    }
  }
  