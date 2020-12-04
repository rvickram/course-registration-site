import { Course } from "./Course";

export class Schedule {
    constructor(
        public title:string = '',
        public description:string = '',
        public courses:Course[] = [],
        public lastEdited:string = '',
        public publicVis:boolean = false
    ) {};

    public set(schedule: Schedule) {
        this.title = schedule.title;
        this.description = schedule.description;
        this.courses = schedule.courses;
        this.lastEdited = schedule.lastEdited;
        this.publicVis = schedule.publicVis;
    }

    public reset():void {
        this.title = '';
        this.description = '';
        this.courses = [];
        this.lastEdited = '';
        this.publicVis = false;
    }
}