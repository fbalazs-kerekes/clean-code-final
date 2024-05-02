import { Course } from "./Course";
import { Person } from "./Person";

export class Student extends Person {
    private registredCourses: Course[] = [];
}