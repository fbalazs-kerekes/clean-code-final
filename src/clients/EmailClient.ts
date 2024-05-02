import { IMessageClient } from "../abstraction/clients/IMessageClient";

export class EmailClient implements IMessageClient {
    async SendMessage(message: string): Promise<void> {
        console.log(`Email: ${message}`);
    }
}