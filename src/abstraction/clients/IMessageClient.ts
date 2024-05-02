export interface IMessageClient {
    SendMessage(message: string): Promise<void>;
}