import { IDbClient } from "../abstraction/clients/IDbClient";
import { Course } from "../models/Course";
import { CourseStatistics } from "../models/CourseStatistics";
import { Student } from "../models/Student";

export class DbClient implements IDbClient {
    async GetCourseStatistics(course: Course): Promise<CourseStatistics | undefined> {
        console.log(`Db call GetCourseStatistics for ${course.GetCourseName()}`);
        throw new Error('Not implemented yet!');
    }
    async GetCourses(): Promise<Course[]> {
        console.log(`Db call GetCourses`);
        throw new Error('Not implemented yet!');
    }
    async GetCourseByName(courseName: string): Promise<Course | undefined> {
        console.log(`Db call GetCourseByName with ${courseName}`);
        throw new Error('Not implemented yet!');
    }
    async AddStudentToCourse(student: Student, course: Course): Promise<void> {
        console.log(`Db call ${student.GetName()} added to ${course.GetCourseName()} course`);
        throw new Error('Not implemented yet!');
    }
    async AddCourse(course: Course): Promise<void> {
        console.log(`Db call ${course.GetCourseName()} course added`);
        throw new Error('Not implemented yet!');
    }

}