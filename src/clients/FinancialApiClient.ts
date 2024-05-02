import { IFinancialApiClient } from "../abstraction/clients/IFinancialApiClient";
import { Student } from "../models/Student";

export class FinancialApiClient implements IFinancialApiClient {
    async isOrderPaid(student: Student): Promise<boolean> {
        return true;
    }
}