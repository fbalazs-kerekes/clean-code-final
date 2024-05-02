import { IDbClient } from "../../src/abstraction/clients/IDbClient";
import { DbClient } from "../../src/clients/DbClient"
import { Course } from "../../src/models/Course";
import { Student } from "../../src/models/Student";



describe('DbClient test', () => {
    const courseName = 'C1';
    const course = new Course(courseName, new Date('2024-02-01'), 5, 60000);
    const student = new Student('S1', 25);
    const exceptedErrorMessage = 'Not implemented yet!';
    const expectedError = new Error(exceptedErrorMessage);
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();

    let dbClient: IDbClient;

    beforeEach(() => {
        dbClient = new DbClient();
        consoleLogSpy.mockReset();
    })

    describe('Happy path', () => {
        it('should be throw a not implemented yet exception and console.log write message when AddCourse called', async () => {

            const expectedError = new Error(exceptedErrorMessage);
            const expectedConsoleLogMessage = `Db call ${course.GetCourseName()} course added`;

            await expect(() => dbClient.AddCourse(course)).rejects.toThrow(expectedError);

            expect(consoleLogSpy).toHaveBeenCalledWith(expectedConsoleLogMessage);
        })

        it('should be throw a not implemented yet exception and console.log write message when AddStudentToCourse called', async () => {
            const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
            const expectedConsoleLogMessage = `Db call ${student.GetName()} added to ${course.GetCourseName()} course`;

            await expect(() => dbClient.AddStudentToCourse(student, course)).rejects.toThrow(expectedError);

            expect(consoleLogSpy).toHaveBeenCalledWith(expectedConsoleLogMessage);
        })

        it('should be throw a not implemented yet exception and console.log write message when GetCourseByName called', async () => {
            const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
            const expectedConsoleLogMessage = `Db call GetCourseByName with ${courseName}`;

            await expect(() => dbClient.GetCourseByName(courseName)).rejects.toThrow(expectedError);

            expect(consoleLogSpy).toHaveBeenCalledWith(expectedConsoleLogMessage);
        })

        it('should be throw a not implemented yet exception and console.log write message when GetCourses called', async () => {
            const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
            const expectedConsoleLogMessage = 'Db call GetCourses';

            await expect(() => dbClient.GetCourses()).rejects.toThrow(expectedError);

            expect(consoleLogSpy).toHaveBeenCalledWith(expectedConsoleLogMessage);
        })

        it('should be throw a not implemented yet exception and console.log write message when GetCourseStatistics called', async () => {
            const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
            const expectedConsoleLogMessage = `Db call GetCourseStatistics for ${course.GetCourseName()}`;

            await expect(() => dbClient.GetCourseStatistics(course)).rejects.toThrow(expectedError);

            expect(consoleLogSpy).toHaveBeenCalledWith(expectedConsoleLogMessage);
        })
    })
})