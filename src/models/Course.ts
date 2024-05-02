import { Student } from "./Student";

export class Course {
    private students: Student[] = [];
    constructor(private courseName: string, private startDate: Date, private lengthInWeeks: number, private costInHuf: number) { }

    public GetCourseName(): string {
        return this.courseName;
    }

    public GetStartDate(): Date {
        return this.startDate;
    }

    public GetLengthInWeeks(): number {
        return this.lengthInWeeks;
    }

    public GetCostInHuf(): number {
        return this.costInHuf;
    }

    public GetStudents(): Student[] {
        return this.students;
    }
}
