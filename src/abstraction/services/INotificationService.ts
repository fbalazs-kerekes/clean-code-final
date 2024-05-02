export interface INotificationService {
    SendNotifications(message: string): Promise<void>;
}