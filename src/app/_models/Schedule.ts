import { Course } from "./Course";

export class Schedule {
    constructor(
        public title: string,
        public description: string,
        public courses: Course[],
        public lastEdited: Date,
        public publicVis: boolean
    ) {};
}