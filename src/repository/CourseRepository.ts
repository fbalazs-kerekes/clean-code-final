import { ICourseRepository } from "../abstraction/repository/ICourseRepository";
import { DbClient } from "../clients/DbClient";
import { DatabaseException } from "../exceptions/DatabaseException";
import { UnknownErrorException } from "../exceptions/UnknownErrorException";
import { Course } from "../models/Course";
import { CourseStatistics } from "../models/CourseStatistics";
import { Student } from "../models/Student";

export class CourseRepository implements ICourseRepository {

    constructor(private dbClient: DbClient) { }

    async AddCourse(course: Course): Promise<void> {
        try {
            await this.dbClient.AddCourse(course);
        } catch (error) {
            if (error instanceof DatabaseException) {
                console.log(`AddCourse database error: ${error.message}`);
                throw error;
            }
            throw new UnknownErrorException('Unknown error happened', error as Error);
        }
    }

    async AddStudentToCourse(student: Student, course: Course): Promise<void> {
        try {
            await this.dbClient.AddStudentToCourse(student, course);
        } catch (error) {
            if (error instanceof DatabaseException) {
                console.log(`AddStudentToCourse database error: ${error.message}`);
                throw error;
            }
            throw new UnknownErrorException('Unknown error happened', error as Error);
        }
    }

    async GetCourseByName(courseName: string): Promise<Course | undefined> {
        try {
            return await this.dbClient.GetCourseByName(courseName);
        } catch (error) {
            if (error instanceof DatabaseException) {
                console.log(`GetCourseByName database error: ${error.message}`);
                throw error;
            }
            throw new UnknownErrorException('Unknown error happened', error as Error);
        }
    }

    async GetCourses(): Promise<Course[]> {
        try {
            return await this.dbClient.GetCourses();
        } catch (error) {
            if (error instanceof DatabaseException) {
                console.log(`GetCourses database error: ${error.message}`);
                throw error;
            }
            throw new UnknownErrorException('Unknown error happened', error as Error);
        }
    }

    async GetCourseStatistics(course: Course): Promise<CourseStatistics | undefined> {
        try {
            return await this.dbClient.GetCourseStatistics(course);
        } catch (error) {
            if (error instanceof DatabaseException) {
                console.log(`GetCourseStatistics database error: ${error.message}`);
                throw error;
            }
            throw new UnknownErrorException('Unknown error happened', error as Error);
        }
    }
}