import { IMessageClient } from "../../src/abstraction/clients/IMessageClient";
import { PushNotificationClient } from "../../src/clients/PushNotificationClient";

describe('PushNotificationClient test', () => {
    let pushNotificationClient: IMessageClient;

    beforeEach(() => {
        pushNotificationClient = new PushNotificationClient();
    })

    it('should send a push notification message', async () => {
        const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
        const message = 'Notification';
        const expectedConsoleLogMessage = `Push notification: ${message}`;

        await pushNotificationClient.SendMessage(message);
        expect(consoleLogSpy).toHaveBeenCalledWith(expectedConsoleLogMessage);
    })

})
