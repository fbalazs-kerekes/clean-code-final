import { INotificationService } from "../../src/abstraction/services/INotificationService";
import { IPaymentService } from "../../src/abstraction/services/IPaymentService";
import { EmailClient } from "../../src/clients/EmailClient";
import { PushNotificationClient } from "../../src/clients/PushNotificationClient";
import { NetworkFailureException } from "../../src/exceptions/NetworkFailureException";
import { NotificationService } from "../../src/services/NotificationService";
import { mock, mockReset } from "jest-mock-extended";

const mockPushNotificationClient = mock<PushNotificationClient>();
const mockEmailClient = mock<EmailClient>();
const mockMessageClients = [mockPushNotificationClient, mockEmailClient];

describe('NotificationService test', () => {
    let notificationService: INotificationService;

    beforeEach(() => {
        mockMessageClients.map((messageClient) => mockReset(messageClient));
        notificationService = new NotificationService(mockMessageClients);
    })

    describe('Happy path', () => {
        it('should send message by message clients over notification service', async () => {
            const message = 'Student added.';

            await notificationService.SendNotifications(message)

            mockMessageClients.map(messageClient => {
                expect(messageClient.SendMessage).toHaveBeenCalledTimes(1);
                expect(messageClient.SendMessage).toHaveBeenCalledWith(message);
            });
        });
    })

    describe('Error path', () => {
        it('should throw network failure exception by message clients over notification service', async () => {
            const message = 'Student added.';
            mockMessageClients.map(messageClient => messageClient.SendMessage.mockImplementation(() => { throw new NetworkFailureException('Network failure.') }));

            await expect(() => notificationService.SendNotifications(message)).rejects.toThrow(NetworkFailureException);
        });
    })

})
