import { mock, mockReset } from "jest-mock-extended";
import { ICourseRepository } from "../../src/abstraction/repository/ICourseRepository";
import { CourseRepository } from "../../src/repository/CourseRepository";
import { Course } from "../../src/models/Course";
import { Student } from "../../src/models/Student";
import { DatabaseException } from "../../src/exceptions/DatabaseException";
import { UnknownErrorException } from "../../src/exceptions/UnknownErrorException";
import { IDbClient } from "../../src/abstraction/clients/IDbClient";

describe('CourseRepository test', () => {
    const mockDbClient = mock<IDbClient>();
    const courseName = 'C1';
    const course = new Course(courseName, new Date('2024-02-01'), 5, 60000);
    const student = new Student('S1', 25);

    let courseRepository: ICourseRepository;

    beforeEach(() => {
        mockReset(mockDbClient);
        courseRepository = new CourseRepository(mockDbClient);
    })

    describe('Happy path', () => {
        it('should add course using repository', async () => {
            await courseRepository.AddCourse(course);

            expect(mockDbClient.AddCourse).toHaveBeenCalledTimes(1);
            expect(mockDbClient.AddCourse).toHaveBeenCalledWith(course);
        })

        it('should add student to course using repository', async () => {
            await courseRepository.AddStudentToCourse(student, course);

            expect(mockDbClient.AddStudentToCourse).toHaveBeenCalledTimes(1);
            expect(mockDbClient.AddStudentToCourse).toHaveBeenCalledWith(student, course);
        })

        it('should add student to course using repository', async () => {
            await courseRepository.GetCourseByName(courseName);

            expect(mockDbClient.GetCourseByName).toHaveBeenCalledTimes(1);
            expect(mockDbClient.GetCourseByName).toHaveBeenCalledWith(courseName);
        })

        it('should get courses using repository', async () => {
            await courseRepository.GetCourses();

            expect(mockDbClient.GetCourses).toHaveBeenCalledTimes(1);
        })

        it('should get course statistics using repository', async () => {
            await courseRepository.GetCourseStatistics(course);

            expect(mockDbClient.GetCourseStatistics).toHaveBeenCalledTimes(1);
        })

    })

    describe('Error path', () => {
        const databaseErrorMessage = 'Database failed.';
        const unknownErrorMessage = 'Unknown error happened';

        it('should throw a database error when add course to repository', async () => {
            mockDbClient.AddCourse.mockImplementation(() => { throw new DatabaseException(databaseErrorMessage); });

            await expect(() => courseRepository.AddCourse(course)).rejects.toThrow(DatabaseException);
        })

        it('should throw a database error when add student to course to repository', async () => {
            mockDbClient.AddStudentToCourse.mockImplementation(() => { throw new DatabaseException(databaseErrorMessage); });

            await expect(() => courseRepository.AddStudentToCourse(student, course)).rejects.toThrow(DatabaseException);
        })

        it('should throw a database error when get course by name from repository', async () => {
            mockDbClient.GetCourseByName.mockImplementation(() => { throw new DatabaseException(databaseErrorMessage); });

            await expect(() => courseRepository.GetCourseByName(courseName)).rejects.toThrow(DatabaseException);
        })

        it('should throw a database error when get courses from repository', async () => {
            mockDbClient.GetCourses.mockImplementation(() => { throw new DatabaseException(databaseErrorMessage); });

            await expect(() => courseRepository.GetCourses()).rejects.toThrow(DatabaseException);
        })

        it('should throw a database error when get courses from repository', async () => {
            mockDbClient.GetCourseStatistics.mockImplementation(() => { throw new DatabaseException(databaseErrorMessage); });

            await expect(() => courseRepository.GetCourseStatistics(course)).rejects.toThrow(DatabaseException);
        })

        it('should throw a unknown error when add course to repository', async () => {
            mockDbClient.AddCourse.mockImplementation(() => { throw new Error(unknownErrorMessage); });

            await expect(() => courseRepository.AddCourse(course)).rejects.toThrow(UnknownErrorException);
        })

        it('should throw a unknown error when add student to course to repository', async () => {
            mockDbClient.AddStudentToCourse.mockImplementation(() => { throw new Error(unknownErrorMessage); });

            await expect(() => courseRepository.AddStudentToCourse(student, course)).rejects.toThrow(UnknownErrorException);
        })

        it('should throw a unknown error when get course by name from repository', async () => {
            mockDbClient.GetCourseByName.mockImplementation(() => { throw new Error(unknownErrorMessage); });

            await expect(() => courseRepository.GetCourseByName(courseName)).rejects.toThrow(UnknownErrorException);
        })

        it('should throw a unknown error when get courses from repository', async () => {
            mockDbClient.GetCourses.mockImplementation(() => { throw new Error(unknownErrorMessage); });

            await expect(() => courseRepository.GetCourses()).rejects.toThrow(UnknownErrorException);
        })

        it('should throw a unknown error when get courses from repository', async () => {
            mockDbClient.GetCourseStatistics.mockImplementation(() => { throw new Error(unknownErrorMessage); });

            await expect(() => courseRepository.GetCourseStatistics(course)).rejects.toThrow(UnknownErrorException);
        })

    })

})