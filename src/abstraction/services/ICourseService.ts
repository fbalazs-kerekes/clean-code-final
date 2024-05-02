import { Course } from "../../models/Course";
import { CourseStatistics } from "../../models/CourseStatistics";
import { Student } from "../../models/Student";

export interface ICourseService {
    AddCourse(course: Course): Promise<void>;
    GetCourses(): Promise<Course[]>;
    GetCourseByName(name: string): Promise<Course | undefined>;
    AddStudentToCourse(student: Student, course: Course): Promise<void>;
    GetCourseStatistics(course: Course): Promise<CourseStatistics | undefined>;
}