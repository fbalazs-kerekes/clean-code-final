import { IMessageClient } from "../../src/abstraction/clients/IMessageClient";
import { EmailClient } from "../../src/clients/EmailClient";

describe('EmailClient test', () => {
    let emailClient: IMessageClient;

    beforeEach(() => {
        emailClient = new EmailClient();
    })

    it('should send a email message', async () => {
        const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
        const message = 'Message';
        const expectedConsoleLogMessage = `Email: ${message}`;

        await emailClient.SendMessage(message);
        expect(consoleLogSpy).toHaveBeenCalledWith(expectedConsoleLogMessage);
    })

})
