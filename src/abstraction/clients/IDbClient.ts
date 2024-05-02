import { Course } from "../../models/Course";
import { CourseStatistics } from "../../models/CourseStatistics";
import { Student } from "../../models/Student";

export interface IDbClient {
    GetCourseStatistics(course: Course): Promise<CourseStatistics | undefined>;
    GetCourses(): Promise<Course[]>;
    GetCourseByName(courseName: string): Promise<Course | undefined>;
    AddStudentToCourse(student: Student, course: Course): Promise<void>;
    AddCourse(course: Course): Promise<void>;
}