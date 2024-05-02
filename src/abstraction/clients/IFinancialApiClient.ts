import { Student } from "../../models/Student";

export interface IFinancialApiClient {
    isOrderPaid(student: Student): Promise<boolean>;
}