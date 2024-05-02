import { IMessageClient } from "../abstraction/clients/IMessageClient";

export class PushNotificationClient implements IMessageClient {
    async SendMessage(message: string): Promise<void> {
        console.log(`Push notification: ${message}`);
    }
}