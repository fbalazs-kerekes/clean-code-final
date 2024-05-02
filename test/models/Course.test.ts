import { Course } from "../../src/models/Course"
import { Student } from "../../src/models/Student";

describe('Course test', () => {
    it('should be return course data', () => {
        const expectedCourseName = 'CR5';
        const expectedStartDate = new Date('2024-05-01');
        const expectedLengthInWeeks = 4;
        const expectedCostInHuf = 60000;
        const expectedStudents: Student[] = [];
        const course = new Course(expectedCourseName, expectedStartDate, expectedLengthInWeeks, expectedCostInHuf);

        expect(course.GetCourseName()).toBe(expectedCourseName);
        expect(course.GetStartDate()).toBe(expectedStartDate);
        expect(course.GetLengthInWeeks()).toEqual(expectedLengthInWeeks);
        expect(course.GetCostInHuf()).toBeCloseTo(expectedCostInHuf);
        expect(course.GetStudents()).toEqual(expectedStudents);
    })
})