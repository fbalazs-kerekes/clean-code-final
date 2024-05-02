import { IFinancialApiClient } from "../../src/abstraction/clients/IFinancialApiClient";
import { FinancialApiClient } from "../../src/clients/FinancialApiClient";
import { Student } from "../../src/models/Student";

describe('FinancialApiClient test', () => {
    const student = new Student('S1', 25);
    let financialApiClient: IFinancialApiClient;

    beforeEach(() => {
        financialApiClient = new FinancialApiClient();
    })

    it('should throw not implemented yet error and ', () => {
        const result = financialApiClient.isOrderPaid(student);

        expect(result).toBeTruthy();
    })

})
