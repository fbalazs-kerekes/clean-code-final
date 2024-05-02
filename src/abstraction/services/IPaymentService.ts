import { Student } from "../../models/Student";

export interface IPaymentService {
    isOrderPaid(student: Student): Promise<boolean>;
    
}