import { IPaymentService } from "../abstraction/services/IPaymentService";
import { FinancialApiClient } from "../clients/FinancialApiClient";
import { NetworkFailureException } from "../exceptions/NetworkFailureException";
import { Student } from "../models/Student";

export class PaymentService implements IPaymentService {
    constructor(private financialApiClient: FinancialApiClient) {}

    async isOrderPaid(student: Student): Promise<boolean> {
        try {
            return await this.financialApiClient.isOrderPaid(student);
        } catch (error) {
            if (error instanceof NetworkFailureException) {
                console.log(`Network failure: ${error.message}`);
            }
            throw error;
        }
    }    
}