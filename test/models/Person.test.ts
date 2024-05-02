import { Lecturer } from "../../src/models/Lecturer";
import { Student } from "../../src/models/Student";

describe('Person test', () => {
    it.each([
        ['S1', 25],
        ['S2', 27],
    ])('should be return student data', (expectedStudentName, expectedStudentAge) => {
        const student = new Student(expectedStudentName, expectedStudentAge);
        expect(student.GetName()).toEqual(expectedStudentName);
        expect(student.GetAge()).toBeCloseTo(expectedStudentAge);
    })

    it.each([
        ['L1', 32],
        ['L2', 42],
    ])('should be return lecture data', (expectedLecturerName, expectedLectureAge) => {
        const lecturer = new Lecturer(expectedLecturerName, expectedLectureAge);
        expect(lecturer.GetName()).toEqual(expectedLecturerName);
        expect(lecturer.GetAge()).toBeCloseTo(expectedLectureAge);
    })
})
