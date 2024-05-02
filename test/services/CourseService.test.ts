import { CourseService } from "../../src/services/CourseService";
import { mock, mockReset } from "jest-mock-extended";
import { Course } from "../../src/models/Course";
import { DatabaseException } from "../../src/exceptions/DatabaseException";
import { Student } from "../../src/models/Student";
import { PaymentException } from "../../src/exceptions/PaymentException";
import { CourseStatistics } from "../../src/models/CourseStatistics";
import { ResourceNotFoundException } from "../../src/exceptions/ResourceNotFoundException";
import { UnknownErrorException } from "../../src/exceptions/UnknownErrorException";
import { ICourseService } from "../../src/abstraction/services/ICourseService";
import { ICourseRepository } from "../../src/abstraction/repository/ICourseRepository";
import { IPaymentService } from "../../src/abstraction/services/IPaymentService";
import { INotificationService } from "../../src/abstraction/services/INotificationService";

const mockCourseRepository = mock<ICourseRepository>();
const mockPaymentService = mock<IPaymentService>();
const mockNotificationService = mock<INotificationService>();

const courses: Course[] = [
    new Course('CR1', new Date('2024-01-01'), 5, 10000),
    new Course('CR2', new Date('2024-02-01'), 4, 20000),
    new Course('CR3', new Date('2024-03-01'), 3, 30000),
];

const courseStatistics = [
    new CourseStatistics('CR1', 100, 50, 30, new Date('2024-01-02 11:10:00')),
    new CourseStatistics('CR2', 200, 50, 30, new Date('2024-02-02 11:10:00')),
    new CourseStatistics('CR3', 150, 50, 30, new Date('2024-03-02 11:10:00'))
];

describe('CourseService test', () => {
    let courseService: ICourseService;

    beforeEach(() => {
        mockReset(mockCourseRepository);
        mockReset(mockPaymentService);
        mockReset(mockNotificationService);
        courseService = new CourseService(mockCourseRepository, mockPaymentService, mockNotificationService)
    })

    describe('Happy path', () => {

        const course = new Course('C4', new Date('2024-04-01'), 5, 40000);
        const student = new Student('Student 1', 20);

        it('should add course into database', async () => {
            mockCourseRepository.AddCourse.mockResolvedValue(void 0);

            await courseService.AddCourse(course);

            expect(mockCourseRepository.AddCourse).toHaveBeenCalledTimes(1);
            expect(mockCourseRepository.AddCourse).toHaveBeenCalledWith(course);
        })

        it('should add student to course into database', async () => {
            mockCourseRepository.AddCourse.mockResolvedValue(void 0);
            mockPaymentService.isOrderPaid.mockResolvedValue(true);

            await courseService.AddStudentToCourse(student, course);

            expect(mockCourseRepository.AddStudentToCourse).toHaveBeenCalledTimes(1);
            expect(mockCourseRepository.AddStudentToCourse).toHaveBeenCalledWith(student, course);
        })

        it('should get all course from database', async () => {
            mockCourseRepository.GetCourses.mockResolvedValue(courses);

            let courseServiceCourses = await courseService.GetCourses();

            expect(courseServiceCourses).toMatchSnapshot();
            expect(mockCourseRepository.GetCourses).toHaveBeenCalledTimes(1);
        })

        it.each(courses)('should get course by name ($courseName) from database', async (expectedCourse: Course) => {
            const courseName = expectedCourse.GetCourseName();
            mockCourseRepository.GetCourseByName.mockResolvedValue(expectedCourse);

            let courseElement = await courseService.GetCourseByName(courseName);

            expect(courseElement).toBe(expectedCourse);
            expect(mockCourseRepository.GetCourseByName).toHaveBeenCalledTimes(1);
            expect(mockCourseRepository.GetCourseByName).toHaveBeenCalledWith(courseName);
        })

        it.each(courses)('should get resource not found exception when course does not exists by name ($courseName) from database', async (expectedCourse: Course) => {
            const courseName = expectedCourse.GetCourseName();
            const expectedErrorMessage = 'Course not found';
            mockCourseRepository.GetCourseByName.mockResolvedValue(undefined);

            await expect(() => courseService.GetCourseByName(courseName)).rejects.toThrow(expectedErrorMessage);
            await expect(() => courseService.GetCourseByName(courseName)).rejects.toThrow(ResourceNotFoundException);

            expect(mockCourseRepository.GetCourseByName).toHaveBeenCalledTimes(2);
            expect(mockCourseRepository.GetCourseByName).toHaveBeenCalledWith(courseName);
        })

        it.each(courseStatistics)('should get course statistics for $courseName from database', async (expectedCourseStatistic) => {
            const courseElement = courses.find(v => v.GetCourseName() === expectedCourseStatistic.GetCourseName()) as Course;
            mockCourseRepository.GetCourseStatistics.mockResolvedValue(expectedCourseStatistic);

            let courseServiceCourses = await courseService.GetCourseStatistics(courseElement);

            expect(courseServiceCourses).toMatchSnapshot();
            expect(mockCourseRepository.GetCourseStatistics).toHaveBeenCalledTimes(1);
        })

    })


    describe('Error path', () => {
        const course = new Course('C4', new Date('2024-04-01'), 5, 40000);
        const student = new Student('Student 1', 20);

        it('should be throw a DatabaseException when add course into database', async () => {
            mockCourseRepository.AddCourse.mockImplementation(() => { throw new DatabaseException('Add course failed') });

            await expect(() => courseService.AddCourse(course)).rejects.toThrow(DatabaseException);
        })

        it('should be throw a UnknownErrorException when add course into database', async () => {
            mockCourseRepository.AddCourse.mockImplementation(() => { throw new UnknownErrorException('Unknown error occured') });

            await expect(() => courseService.AddCourse(course)).rejects.toThrow(UnknownErrorException);
        })

        it('should be throw a PaymentException when add student to course into database', async () => {
            mockPaymentService.isOrderPaid.mockResolvedValue(false);

            await expect(() => courseService.AddStudentToCourse(student, course)).rejects.toThrow(PaymentException);
        })

        it('should be throw a ResourceNotFoundException when the get course by name call with a non-exists course name', async () => {
            const courseName = 'CR11111';
            mockCourseRepository.GetCourseByName.mockImplementation(() => { throw new ResourceNotFoundException('Course not found') });

            await expect(() => courseService.GetCourseByName(courseName)).rejects.toThrow(ResourceNotFoundException);
        })

        it('should be throw a DatabaseException when the get course statistics', async () => {
            mockCourseRepository.GetCourseStatistics.mockImplementation(() => { throw new DatabaseException('Course not found') });

            await expect(() => courseService.GetCourseStatistics(course)).rejects.toThrow(DatabaseException);
        })

    })

})