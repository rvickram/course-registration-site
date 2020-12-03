export class Course {
    constructor(
        public subject: string,
        public course_code: string,
        public class_name: string,
        public class_number: number,
        public start_time: string,
        public end_time: string,
        public campus: string,
        public room: string,
        public class_section: string,
        public course_component: string,
        public days: string
    ) { }
}