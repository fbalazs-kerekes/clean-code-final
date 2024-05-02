import { Course } from "../../models/Course";
import { CourseStatistics } from "../../models/CourseStatistics";
import { Student } from "../../models/Student";

export interface ICourseRepository {
    AddCourse(course: Course): Promise<void>;
    AddStudentToCourse(student: Student, course: Course): Promise<void>;
    GetCourseByName(courseName: string): Promise<Course | undefined>;
    GetCourses(): Promise<Course[]>;
    GetCourseStatistics(course: Course): Promise<CourseStatistics | undefined>;
}