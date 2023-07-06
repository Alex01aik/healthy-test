export interface INotificationProvider<T> {
    sendNotification(recipient: T, ctx: string): Promise<any>;
}