export class CourseStatistics {
    constructor(
        private courseName: string,
        private totalLectures: number,
        private lecturesCompleted: number,
        private progress: number,
        private lastAccessed: Date
    ) { }

    GetCourseName() {
        return this.courseName;
    }
}