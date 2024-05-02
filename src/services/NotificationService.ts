import { IMessageClient } from "../abstraction/clients/IMessageClient";
import { INotificationService } from "../abstraction/services/INotificationService";
import { NetworkFailureException } from "../exceptions/NetworkFailureException";

export class NotificationService implements INotificationService {
    constructor(private messageClients: IMessageClient[]) {}

    async SendNotifications(message: string): Promise<void> {
        for(let messageClient of this.messageClients) {
            await this.SendNotification(messageClient, message);
        }
    }

    private async SendNotification(messageClient: IMessageClient, message: string) {
        try {
           await messageClient.SendMessage(message);
        } catch (error) {
            if (error instanceof NetworkFailureException) {
                console.log(`Network failure: ${error.message}`);
            }
            throw error;
        }
        console.log(`${messageClient.constructor.name} sends message: ${message}`);
    }    
}