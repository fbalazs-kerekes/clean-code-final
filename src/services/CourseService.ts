import { Course } from "../models/Course";
import { Student } from "../models/Student";
import { ICourseRepository } from "../abstraction/repository/ICourseRepository";
import { IPaymentService } from "../abstraction/services/IPaymentService";
import { INotificationService } from "../abstraction/services/INotificationService";
import { ICourseService } from "../abstraction/services/ICourseService";
import { ResourceNotFoundException } from "../exceptions/ResourceNotFoundException";
import { PaymentException } from "../exceptions/PaymentException";
import { CourseStatistics } from "../models/CourseStatistics";

export class CourseService implements ICourseService {
    constructor(
        private courseRepository: ICourseRepository,
        private paymentService: IPaymentService,
        private notificationService: INotificationService) { }

    public async AddCourse(course: Course): Promise<void>{
        await this.courseRepository.AddCourse(course);
    }

    public async GetCourses(): Promise<Course[]> {
        return await this.courseRepository.GetCourses();
    }

    public async GetCourseByName(courseName: string): Promise<Course | undefined> {

        const course = await this.courseRepository.GetCourseByName(courseName);
        if (!course) { throw new ResourceNotFoundException('Course not found') }

        return course;
    }

    public async AddStudentToCourse(student: Student, course: Course): Promise<void>{
        await this.validateOrderPayed(student);

        await this.courseRepository.AddStudentToCourse(student, course);
        await this.notificationService.SendNotifications(`${student.GetName()} student was added to course.`)
    }

    public async validateOrderPayed(student: Student): Promise<void> {
        const isCoursePayedByStudent = await this.paymentService.isOrderPaid(student);
        if (!isCoursePayedByStudent) { throw new PaymentException('Course is not yet paid by Student.') };
    }

    public async GetCourseStatistics(course: Course): Promise<CourseStatistics | undefined> {
        return await this.courseRepository.GetCourseStatistics(course);
    }
}