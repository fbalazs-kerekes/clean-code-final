import { Course } from "./Course";
import { Person } from "./Person";

export class Lecturer extends Person {
    private assignedCourses: Course[] = [];
}