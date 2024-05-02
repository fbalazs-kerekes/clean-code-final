import { mock, mockReset } from "jest-mock-extended";
import { FinancialApiClient } from "../../src/clients/FinancialApiClient";
import { IPaymentService } from "../../src/abstraction/services/IPaymentService";
import { PaymentService } from "../../src/services/PaymentService";
import { Student } from "../../src/models/Student";
import { NetworkFailureException } from "../../src/exceptions/NetworkFailureException";

const mockFinancialApiClient = mock<IPaymentService>();

describe('PaymentService test', () => {
    let paymentService: IPaymentService;

    beforeEach(() => {
        mockReset(mockFinancialApiClient);
        paymentService = new PaymentService(mockFinancialApiClient);
    })

    describe('Happy path', () => {
        it('should be get order is paid by student', async () => {
            const student = new Student('Student 1', 20);
            mockFinancialApiClient.isOrderPaid.mockResolvedValue(true);

            let orderIsPaid = await paymentService.isOrderPaid(student);

            expect(orderIsPaid).toBeTruthy();
            expect(mockFinancialApiClient.isOrderPaid).toHaveBeenCalledTimes(1);
            expect(mockFinancialApiClient.isOrderPaid).toHaveBeenCalledWith(student);
        })
    })

    describe('Error path', () => {
        it('should be throw network exception get order is paid by student', async () => {
            const student = new Student('Student 1', 20);
            mockFinancialApiClient.isOrderPaid.mockImplementation(() => { throw new NetworkFailureException('Network failure.'); });

            await expect(() => paymentService.isOrderPaid(student)).rejects.toThrow(NetworkFailureException);

            expect(mockFinancialApiClient.isOrderPaid).toHaveBeenCalledTimes(1);
            expect(mockFinancialApiClient.isOrderPaid).toHaveBeenCalledWith(student);
        })
    })
});